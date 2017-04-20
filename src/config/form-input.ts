import {FormGroup} from '@angular/forms';
import {BossyFormInputValidatorConfig} from './form-input-validator';
import {BossyFormLabelConfig} from './form-label';
import {BossyFormRadioConfig} from './form-radio';

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
	radio?: BossyFormRadioConfig;
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
	public radio: BossyFormRadioConfig;
	constructor(options: BossyFormInputInterface) {
		Object.assign(this, options);
	}
}
