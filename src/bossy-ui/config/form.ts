import {BossyFormElementConfig} from './form-element';

export class BossyFormConfig {
  constructor(public elements?: Array<BossyFormElementConfig>,
              public isFormInlined?: boolean,
              public getUrl?: string,
              public postUrl?: string,
              public definitionUrl?: string
  ) {}
}
