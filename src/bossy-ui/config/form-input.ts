import {FormGroup} from '@angular/forms';
import {BossyFormLabelConfig} from './form-label';
import {BossyFormRadioConfig} from './form-radio';
import {BossyFormSelectMenuConfig} from './form-selectmenu';

export interface BossyFormInputInterface {
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
  hasValidation?: boolean;
  radio?: BossyFormRadioConfig;
  selectmenu?: BossyFormSelectMenuConfig;
}

export class BossyFormInputConfig {
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
  public hasValidation?: boolean;
  public radio: BossyFormRadioConfig;
  public selectmenu: BossyFormSelectMenuConfig;

  constructor(options: BossyFormInputInterface) {
    Object.keys(options).forEach((key: string) => {
      this[key] = options[key];
    });
  }

}
