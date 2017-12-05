import {FormGroup} from '@angular/forms';

export interface BossyFormTextareaInterface {
  name: string;
  value?: string;
  label?: string;
  id?: string;
  cssClass?: string;
  errorCssClass?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  formGroup?: FormGroup;
  postingLabel?: string;
  targetURL?: string;
  hasvalidation?: string;
}

export class BossyFormTextareaConfig {
  public name: string;
  public value?: string;
  public label?: string;
  public id?: string;
  public cssClass?: string;
  public errorCssClass?: string;
  public rows?: number;
  public cols?: number;
  public placeholder?: string;
  public formGroup?: FormGroup;
  public postingLabel?: string;
  public targetURL?: string;
  public hasvalidation?: string;

  constructor(options: BossyFormTextareaInterface) {
    Object.assign(this, options);
  }
}
