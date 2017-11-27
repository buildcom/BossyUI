import {FormGroup} from '@angular/forms';
import {BossyFormTextareaValidatorConfig} from '../validators/bossy-form-textarea';

export interface BossyFormTextareaInterface {
  name: string;
  value?: string;
  validatejs?: BossyFormTextareaValidatorConfig;
  label?: string;
  id?: string;
  cssClass?: string;
  errorCssClass?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  formGroup?: FormGroup;
  hasvalidation?: string;
  validators?: Array<any>;
}

export class BossyFormTextareaConfig {
  public name: string;
  public value?: string;
  public validatejs?: BossyFormTextareaValidatorConfig;
  public label?: string;
  public id?: string;
  public cssClass?: string;
  public errorCssClass?: string;
  public rows?: number;
  public cols?: number;
  public placeholder?: string;
  public formGroup?: FormGroup;
  public hasvalidation?: string;
  public validators?: Array<any>;

  constructor(options: BossyFormTextareaInterface) {
    Object.assign(this, options);
  }
}
