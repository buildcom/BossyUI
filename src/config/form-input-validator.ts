import { FormControl } from '@angular/forms';
import {BossyFormInputValidatorConfig} from './form-validator';

export class BossyFormInputValidator {
	private controlName: string;
	private constraint: BossyFormInputValidatorConfig;

	constructor(controlName: string, validate: BossyFormInputValidatorConfig) {
		this.controlName = controlName;
		this.constraint = { [controlName]: validate};
	}
	validateElement = (control: FormControl) => {
		let validate = require('node_modules/validate.js/validate.js');
		let test = validate({[this.controlName]: control.value}, this.constraint);
		if (test === undefined) {
			return null;
		}
		else {
			return {errorMessage: test};
		}
	}
}
