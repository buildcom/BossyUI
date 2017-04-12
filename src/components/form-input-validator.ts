import { FormControl } from '@angular/forms';
import { BossyFormInputValidatorConfig } from '../config/form-input-validator';


declare const require;
const validate = require('../../node_modules/validate.js/validate');

export class BossyFormInputValidator {

	constructor(
		private controlName: string,
		private validateConstraints: BossyFormInputValidatorConfig) {
	}

	validateElement = (control: FormControl) => {
		const validated = validate({[this.controlName]: control.value}, {[this.controlName]: this.validateConstraints});

		return validated;
	}
}
