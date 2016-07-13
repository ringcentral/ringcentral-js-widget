import { RC, injectSDK } from '../services/rc-sdk'
import phoneService from '../services/phone-service'
import loginService from '../services/login-service'
import callLogService from '../services/call-log-service'
import accountService from '../services/account-service'
import rcContactService from '../services/rc-contact-service'
import contactSearchService from '../services/contact-search-service'
import rcContactSearchProvider from '../services/rc-contact-search-provider'
import rcMessageService from '../services/rc-message-service'
import rcMessageProvider from '../services/rc-message-provider'
import rcConferenceSerivce from '../services/rc-conference-service'
import conversationService from '../services/rc-conversation-service'

import md5 from 'blueimp-md5'

import config from '../services/rc-config'
var dialPadSearchProviders = [rcContactSearchProvider]

var services = {}
services['incontact'] = {
    init: {
        after: function() {
            /// critical, inject app key & secret into service
            injectSDK({
                key: this.props.key,
                secret: this.props.secret,
                sandbox: this.props.sandbox
            })
        }
    },
    checkLogin: {
        method: function() {
            return loginService.checkLoginStatus()
        }
    }
}
services['rcPhone'] = {
    init: {
        after: function() {
            /// critical, inject app key & secret into service
            injectSDK({
                key: this.props.key,
                secret: this.props.secret,
                sandbox: this.props.sandbox
            })
        }
    },
    loadData: {
        method: function() {
            rcMessageService.subscribeToMessageUpdate()
            // rcMessageService.syncMessages(this.props.cachedMessageHours);
            accountService.getAccountInfo()
            accountService.getPhoneNumber()
            rcContactService.cacheContacts()
            phoneService.init({
                incomingAudio: config.incomingAudio,
                outgoingAudio: config.outgoingAudio
            })
            callLogService.getCallLogs()
        }
    },
    checkLogin: {
        method: function() {
            return loginService.checkLoginStatus()
        }
    },
    logout: {
        method: function() {
            return loginService.logout()
        }
    }
}
services['auth-panel'] = {
    login: {
        method: function() {
            // return loginService.login(
            //     this.props.username,
            //     this.props.extension,
            //     this.props.password
            // )
            return loginService.oauth()
        }
    }
}
services['dial-pad'] = {
    mount: {
        after: function() {
            if (!accountService.hasServiceFeature('VoipCalling'))
                this.disable()
        }
    },
    callout: {
        method: function() {
            console.log('real call')
            return phoneService.call(
                this.props.fromNumber,
                this.props.toNumber, {
                    remoteVideo: this.props.remoteVideo,
                    localVideo: this.props.localVideo
                })
        }
    },
    queryContacts: {
        method: function() {
            var dialPadSearchFunctions = dialPadSearchProviders.map(provider => {
                return provider.search(this.props.toNumber)
            })
            return contactSearchService.query(dialPadSearchFunctions)
        }
    },
    getOutboundCallerID: {
        method: function() {
            return accountService.getPhoneNumber().then(() => {
                return accountService.listNumber('VoiceFax', 'CallerId')
            })
        }
    }
}

services['conference'] = {
    getConferenceInfo: {
        method: function() {
            return rcConferenceSerivce.getConferenceInfo()
        }
    }
}
services['call-log'] = {
    init: {
        method: function() {
            return callLogService.getCallLogs()
        }
    }
}

services['time-line'] = {
    mount: {
        after: function() {
            rcMessageService.subscribeToMessageUpdate()
            rcMessageProvider.onMessageUpdated(msg => {
                this.updateTimeline(conversationService.syncContent(this.props.contacts, msg))
                if (this.props.currentConv) {
                    this.props.currentConv.confirmMessages()
                    this.props.currentConv.addIncomingMessages()
                }
            })
            return rcContactService.cacheContacts().then(contacts => this.props.contacts = contacts)
        }
    },
    fetchData: {
        method: function() {
            return Promise.all([
                rcContactService.cacheContacts(), // first one must be the contacts
                rcMessageService.syncMessages(conversationService.cachedHour),
                callLogService.getCallLogs(),
            ]).then(result => conversationService.organizeContent(...result))
        }
    }
}

services['contacts'] = {
    mount: {
        after: function() {
            this.fetchContacts()
        }
    },
    fetchRelatedContact: {
        method: function() {
            return Promise.all([
                rcMessageService.syncMessages(conversationService.cachedHour),
                callLogService.getCallLogs(),
                rcContactService.cacheContacts()
            ]).then(result => {
                var [msgs, logs, contacts] = result
                this.props.contacts = contacts.reduce((result, contact) => {
                    result[contact.id] = contact
                    return result
                }, {})
                return conversationService.getConversations(contacts, msgs, logs)
            }).then(relateContacts => {
                this.props.relateContacts = relateContacts
                return relateContacts
            }).then(relateContacts =>
                Object.keys(relateContacts).map(index => {
                    // adapt to messages template format
                    relateContacts[index].msg[0].contact = relateContacts[index].displayName
                    // for conversation-advance temaplate
                    relateContacts[index].msg[0].contactId = index
                    return relateContacts[index].msg[0]
                })
            )
        }
    },
    fetchContacts: {
        method: function() {
            // var dialPadSearchFunctions = dialPadSearchProviders.map(provider => {
            //     return provider.searchAll();
            // });
            // return contactSearchService.query(dialPadSearchFunctions);
            return rcContactService.cacheContacts().then(contacts => {
                this.props.contacts = contacts.reduce((result, contact) => {
                    result[contact.id] = contact
                    return result
                }, {})
                return contacts.map(contact => {
                    return {
                        name: contact.displayName,
                        type: 'rc',
                        id: contact.id,
                    }
                })
            }).catch(e => console.error(e))
        }
    }
}

services['conversation-advanced'] = {
    init: {
        after: function() {
        }
    },
    mount: {
        after: function() {
            return accountService.getAccountInfo()
                    // FIXME: set props from outside is a anti-pattern
                    .then(info => this.props.fromExt = info.extensionNumber)
                    .then(() => {
                        this.setOutboundCallerID()
                    })
        }
    },
    send: {
        method: function() {
            if (!this.props.toNumber || this.props.toNumber === this.props.toExt) {
                return rcMessageService.sendPagerMessage(
                    this.props.message,
                    this.props.fromExt,
                    this.props.toExt
                )
            } else {
                return rcMessageService.sendSMSMessage(
                    this.props.message,
                    this.props.fromNumber,
                    this.props.toNumber
                )
            }
        }
    },
    sendFax: {
        method: function() {
            rcMessageService.sendFax(
                this.props.files,
                this.props.toNumber || this.props.toExt
            )
        }
    },
    callout: {
        method: function() {
            return phoneService.call(
                this.props.fromNumber || this.props.fromExt,
                this.props.toNumber || this.props.toExt, {
                    remoteVideo: this.props.remoteVideo,
                    localVideo: this.props.localVideo
                })
        }
    },
    reachTop: {
        method: function() {
            console.log('load content')
            return conversationService.loadContent(this.props.contact, this.props.loadingPeriod)
        }
    },
    getAvatar: {
        method: function() {
            if (!this.props.profileImage)
                return Promise.resolve(`https://www.gravatar.com/avatar/${md5(this.props.contact.id)}?d=retro`)
            return RC.sdk.platform()
                .get(this.props.profileImage + `?access_token=${rcContactService.accessToken()}`)
                .then(r => r.response())
                .then(r => {
                    // Real contact, no avatar
                    if (r.status === 204 || r.status === 404) {
                        var hash = md5(this.props.contact.id)
                        return `https://www.gravatar.com/avatar/${hash}?d=retro`
                    } else {
                        // Real contact, has avatar
                        return
                        this.props.profileImage + `?access_token=${rcContactService.accessToken()}`
                    }
                })
                .catch(e => {
                    // Real contact, no avatar
                    var hash = md5(this.props.contact.id)
                    return `https://www.gravatar.com/avatar/${hash}?d=retro`
                })
        }
    },
    transformURL: {
        method: function() {
            return this.props.transformee + `?access_token=${rcContactService.accessToken()}`
        } 
    },
    getFileInfo: {
        method: function() {
            console.log(this.props.fileURL);
            return RC.sdk.platform()
                .get(this.props.fileURL)
                .then(r => r.json())
        } 
    },
    setOutboundCallerID: {
        method: function() {
            return accountService.getPhoneNumber().then(() => {
                return accountService.listNumber('VoiceFax', 'CallerId')
            })
        }
    }
}
services['call-panel'] = {
    init: {
        after: function() {
            phoneService.init({
                incomingAudio: config.incomingAudio,
                outgoingAudio: config.outgoingAudio
            })
            phoneService.on('progress', () => {
                if (!this._mounted) {
                    this.mount(this.props.target)
                }
            })
            phoneService.on('bye', () => {
                this.unmount()
            })
            phoneService.on('terminated', () => {
                this.unmount()
            })
            phoneService.on('rejected', () => {
                this.unmount()
            })
            phoneService.on('failed', () => {
                this.unmount()
            })
            phoneService.on('accepted', () => {
                console.log('accept')
                this.start()
            })
        }
    },
    mount: {
        after: function() {

        }
    },
    getContact: {
        method: function() {
            var dialPadSearchFunctions = dialPadSearchProviders.map(provider => {
                return provider.search(this.props.name)
            })
            return contactSearchService.query(dialPadSearchFunctions)
        }
    },
    hangup: {
        method: function() {
            return phoneService.hangup()
        },
    },
    hold: {
        method: function() {
            return phoneService.hold(!this.props.isHold)
        },
    },
    mute: {
        method: function() {
            return phoneService.mute(!this.props.isMute)
        },
    },
    flip: {
        method: function() {
            return phoneService.flip(this.props.actionNumber)
        },
    },
    transfer: {
        method: function() {
            return phoneService.transfer(this.props.actionNumber)
        },
    },
    record: {
        method: function() {
            console.log(this.props.isRecord)
            return phoneService.record(!this.props.isRecord)
        },
    },
    park: {
        method: function() {
            return phoneService.park()
        },
    },
    dtmf: {
        method: function(number) {
            return phoneService.dtmf(this.props.dtmfNumber)
        }
    },
    queryContacts: {
        method: function() {
            var dialPadSearchFunctions = dialPadSearchProviders.map(provider => {
                return provider.search(this.props.inputValue)
            })
            return contactSearchService.query(dialPadSearchFunctions)
        }
    },
    getOutboundCallerID: {
        method: function() {
            return accountService.getPhoneNumber().then(() => {
                return accountService.listNumber('VoiceFax', 'CallerId')
            })
        }
    }
}
services['call-panel-incoming'] = {
    init: {
        method: function() {
            phoneService.on('invite', session => {
                this.props.session = session
                var name = session.request.from.displayName ||
                            session.request.from.friendlyName.split("@")[0]
                this.setName(name)
                this.mount(this.props.target)
                phoneService.on('terminated', () => {
                    this.unmount()
                })
                phoneService.on('failed', () => {
                    this.unmount()
                })
            })
        }
    },
    accept: {
        method: function() {
            return phoneService.accept({
                remoteVideo: this.props.remoteVideo,
                localVideo: this.props.localVideo,
            })
        }
    },
    reject: {
        method: function() {
            return phoneService.reject()
        }
    },
    forward: {
        method: function() {
            return phoneService.forward(this.props.actionNumber)
        },
    },
    queryContacts: {
        method: function() {
            var dialPadSearchFunctions = dialPadSearchProviders.map(provider => {
                return provider.search(this.props.inputValue)
            })
            return contactSearchService.query(dialPadSearchFunctions)
        }
    },
}
export default services
