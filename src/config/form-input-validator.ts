import { FormControl } from '@angular/forms';
import {BossyFormInputValidatorConfig} from './form-validator';

export class BossyFormInputValidator {
	private controlName: string;
	private constraint: BossyFormInputValidatorConfig;

	constructor(controlName: string, validate: BossyFormInputValidatorConfig) {
		this.controlName = controlName;
		this.constraint = { [controlName]: validate };
	}
	validateElement = (control: FormControl) => {
		let validate = require('node_modules/validate.js/validate.js');

		// console.log(control.root);
		// this.constraint = {equalTo : { textInput, equalityStuff }};
		//validate({[this.controlName]: control.value, [equalTo]: control.root.get(), {equalityStuff})
		//^^^^^goal                                                 ^^problem

		let test = validate({[this.controlName]: control.value}, this.constraint);
		if (test === undefined) {
			return null;
		}
		else {
			return {errorMessage: test};
		}
	}
}
