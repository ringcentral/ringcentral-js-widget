const fs = require('fs');
const path = require('path');
const { envList: envs } = require('./src/lib/accountManager');
const { accounts } = require('./src/lib/accountManager/accountTypes');

const loginInfoPath = './loginInfo.js';
const isExists = fs.existsSync(path.resolve(__dirname, loginInfoPath));
const loginInfo = isExists ? require(loginInfoPath) : {};

module.exports = {
  selectorLabel: 'data-sign',
  caseServices: [{
    name: 'einstein',
    url: 'http://einstein.int.ringcentral.com/',
    handler: './einstein.js'
  }],
  exec: {
    drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverChrome'],
    levels: ['p0', 'p1'],
    brands: ['rc'],
    envs: ['prod'],
    accounts: ['CM_RC_US'],
    tags: [
      ['widgets'],
      ['salesforce'],
      ['google'],
      ['office'],
    ],
  },
  defaults: {
    drivers: ['enzyme', 'puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'seleniumWebdriverChrome'],
    levels: ['p3'],
    brands: ['rc'],
    tags: [
      [
        'salesforce',
        {
          modes: ['classic'],
          drivers: ['puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'enzyme', 'seleniumWebdriverChrome']
        }
      ],
    ],
  },
  tester: {
    jest: {
      testURL: 'http://localhost',
      moduleNameMapper: {
        'assets/images/.+?\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$': '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.js'
      },
      transformIgnorePatterns: [
        '.*?/node_modules/(?!(ringcentral-integration|ringcentral-widgets|ringcentral-widgets-demo|locale-loader|babel-settings)/).*/'
      ],
      transform: {
        'loadLocale\\.js$': '<rootDir>/src/__mocks__/loadLocale.js',
        '^.+\\.js$': 'babel-jest'
      },
    }
  },
  params: {
    projects: {
      office: {
        type: 'extension',
        source: './src/targets/google',
        params: {
          brands: {
            rc: {
              ...loginInfo,
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            },
            att: {
              ...loginInfo,
              location: 'chrome-extension://pgjpmeckehbghpkamdammcgmmmbojbdi/client.html',
            }
          }
        }
      },
      salesforce: {
        type: 'uri',
        source: './src/targets/widgets',
        params: {
          modes: [
            'lightning',
            'classic'
          ],
          brands: {
            rc: {
              location: 'https://login.salesforce.com/',
              username: 'integration.end2end@ringcentral.com',
              password: 'RNG94405!'
            },
            att: {
              username: '',
              password: '',
              location: 'https://login.salesforce.com/',
            }
          },
        }
      },
      widgets: {
        type: 'uri',
        source: './src/targets/widgets',
        driver: {
          viewport: {
            height: 518,
            width: 300,
          },
          setting: {
            args: [
              '--disable-dev-shm-usage',
            ]
          }
        },
        params: {
          brands: {
            rc: {
              location: 'http://localhost:8080/',
            },
            att: {
              location: 'http://localhost:8080/',
            },
          },
        }
      }
    },
    drivers: ['enzyme', 'puppeteer', 'seleniumWebdriverFirefox', 'seleniumWebdriverSafari', 'seleniumWebdriverChrome'],
    levels: ['p0', 'p1', 'p2', 'p3'],
    brands: ['rc', 'bt', 'telus', 'att'],
    accounts,
    envs,
  },
  lookupConfig({
    config,
    tag
  }) {
    const project = config.params.projects[tag.project];
    const source = project.source;
    return {
      ...project.params.brands[tag.brands],
      type: project.type,
      source,
    };
  }
};
