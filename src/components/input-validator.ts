import { FormControl } from '@angular/forms';
import { BossyInputValidatorConfig } from '../config/input-validator';


declare const require;
const validate = require('../../node_modules/validate.js/validate');

export class BossyInputValidator {

	constructor(
		private controlName: string,
		private validateConstraints: BossyInputValidatorConfig) {
	}

	validateElement = (control: FormControl) => {
		const validated = validate({[this.controlName]: control.value}, {[this.controlName]: this.validateConstraints});

		return validated;
	}
}
