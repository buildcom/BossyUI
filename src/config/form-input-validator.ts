import { FormControl } from '@angular/forms';
import { BossyFormInputValidatorConfig } from './form-validator';
import * as validate from '../../node_modules/validate.js/validate';

export class BossyFormInputValidator {
	private controlName: string;
	private constraint: BossyFormInputValidatorConfig = new BossyFormInputValidatorConfig();

	constructor(controlName: string, formInputValidatorConfig: BossyFormInputValidatorConfig) {
		this.controlName = controlName;
		this.constraint[controlName] = formInputValidatorConfig;
	}
	validateElement = (control: FormControl) => {
		const test = validate({[this.controlName]: control.value}, this.constraint);
		if (test === undefined) {
			return null;
		}
		else {
			return {errorMessage: test};
		}
	}
}
