import {BossyFormCalendarValidatorConfig} from '../validators/calendar'

export class BossyCalendarConfig {
  defaultDate: Date;
  validatejs?: BossyFormCalendarValidatorConfig;

  constructor() {
    this.defaultDate = new Date();
  }
}
