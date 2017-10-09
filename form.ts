import {BossyFormInputConfig} from './form-input';

export class BossyFormConfig {
  constructor(public elements: Array<BossyFormInputConfig>,
              public isFormInlined?: boolean,
              public isFormLabeled?: boolean,
              public isFormDefaultGroup?: boolean,
              public isFormGrid?: boolean,
              public isFormCompactGrid?: boolean,
              public isFormHorizontal?: boolean,
              public isFormManualSized?: boolean,
              public isFormAutoSized?: boolean,
              public isFormDisabled?: boolean,
              public isFormValidChecked?: boolean) {
  }
}
