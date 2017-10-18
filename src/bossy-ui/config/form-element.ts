import {FormGroup} from '@angular/forms';
import {BossyFormLabelConfig} from './form-label';
import {BossyFormRadioConfig} from './form-radio';
import {BossyFormSelectMenuConfig} from './form-selectmenu';
import {BossyFormTextareaConfig} from './bossy-form-textarea';

export interface BossyFormElementInterface {
  name: string;
  type: string;
  value?: string;
  label?: BossyFormLabelConfig;
  id?: string;
  cssClass?: string;
  errorCssClass?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  formGroup?: FormGroup;
  hasValidation?: string;
  radio?: BossyFormRadioConfig;
  selectmenu?: BossyFormSelectMenuConfig;
  textarea?: BossyFormTextareaConfig;
}

export class BossyFormElementConfig {
  public name: string;
  public type: string;
  public value: string;
  public label: BossyFormLabelConfig;
  public id: string;
  public cssClass: string;
  public errorCssClass: string;
  public rows: number;
  public cols: number;
  public placeholder: string;
  public formGroup: FormGroup;
  public hasValidation?: string;
  public radio: BossyFormRadioConfig;
  public selectmenu: BossyFormSelectMenuConfig;
  public textarea: BossyFormTextareaConfig;

  constructor(options: BossyFormElementInterface) {
    Object.keys(options).forEach((key: string) => {
      this[key] = options[key];
    });
  }

}
