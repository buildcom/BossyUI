import {FormGroup} from '@angular/forms';
import {BossyFormInputValidatorConfig} from './form-input-validator';
import {BossyFormLabelConfig} from './form-label';
<<<<<<< HEAD
import {BossyFormRadioConfig} from './form-radio';
=======
import {BossyFormSelectMenuConfig} from './form-selectmenu';
>>>>>>> 8d58118189f838f1d9b1fa37e43019654c8578dd

export interface BossyFormInputInterface {
	name: string;
	type: string;
	value?: string;
	validatejs?: BossyFormInputValidatorConfig;
	label?: BossyFormLabelConfig;
	id?: string;
	cssClass?: string;
	errorCssClass?: string;
	rows?: number;
	cols?: number;
	placeholder?: string;
	formGroup?: FormGroup;
	hasSuccess?: boolean;
	hasWarning?: boolean;
	hasDanger?: boolean;
<<<<<<< HEAD
	radio?: BossyFormRadioConfig;
=======
	selectmenu?: BossyFormSelectMenuConfig;
>>>>>>> 8d58118189f838f1d9b1fa37e43019654c8578dd
}

export class BossyFormInputConfig {
	public name: string;
	public type: string;
	public value: string;
	public validatejs: BossyFormInputValidatorConfig;
	public label: BossyFormLabelConfig;
	public id: string;
	public cssClass: string;
	public errorCssClass: string;
	public rows: number;
	public cols: number;
	public placeholder: string;
	public formGroup: FormGroup;
	public hasSuccess: boolean;
	public hasWarning: boolean;
	public hasDanger: boolean;
<<<<<<< HEAD
	public radio: BossyFormRadioConfig;
=======
	public selectmenu: BossyFormSelectMenuConfig;
>>>>>>> 8d58118189f838f1d9b1fa37e43019654c8578dd
	constructor(options: BossyFormInputInterface) {
		Object.assign(this, options);
	}

}
