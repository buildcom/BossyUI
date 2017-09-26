import {BossyFormInputConfig} from './form-input';

export class BossyFormConfig {
  constructor(public elements: Array<BossyFormInputConfig>,
              public isFormInlined?: boolean) {
  }
}
