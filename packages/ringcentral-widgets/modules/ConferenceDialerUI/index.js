import { Module } from 'ringcentral-integration/lib/di';
import DialerUI from '../DialerUI';

@Module()
export default class ConferenceDialerUI extends DialerUI {
  constructor({
    prefix,
    ...options
  }) {
    super({
      ...options,
      prefix: `${prefix}-conf`,
    });
  }
}
