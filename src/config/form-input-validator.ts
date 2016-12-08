import { FormControl } from '@angular/forms';
import { BossyFormValidatorConfig } from './form-validator';

export class BossyFormInputValidator {
	private controlName: string;
	private constraint: Constraint;

	constructor(controlName: string, validate?: BossyFormValidatorConfig) {
		this.controlName = controlName;
		this.constraint = { [controlName]: {} };
		this.constraint[controlName].presence = validate.presence;
		this.constraint[controlName].length = {};
		this.constraint[controlName].length.maximum = validate.maximum;
		this.constraint[controlName].length.tooLong = validate.tooLong;
		this.constraint[controlName].length.minimum = validate.minimum;
		this.constraint[controlName].length.tooShort = validate.tooShort;
		this.constraint[controlName].length.is = validate.is;
		this.constraint[controlName].length.wrongLength = validate.wrongLength;
		if (validate.email !== undefined) {
			this.constraint[controlName].email = {};
			this.constraint[controlName].email.message = validate.emailMessage;
		}
		if (validate.regexp !== undefined) {
			this.constraint[controlName].format = {};
			this.constraint[controlName].format.pattern = validate.regexp;
			this.constraint[controlName].format.flag = validate.regexpFlag;
			this.constraint[controlName].format.message = validate.regexpMessage;
		}

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

interface Constraint {
	[controlName: string]: {
		length?: {
			maximum?: number,
			tooLong?: string,
			minimum?: number,
			tooShort?: string,
			is?: number,
			wrongLength?: string,
		}
		email?: {
			message?: string,
		}
		format?: {
			pattern?: string,
			flag?: string,
			message?: string,
		}
		presence?: boolean,
		numericality?: {
			onlyInteger?: boolean,
			strict?: boolean,
			greaterThan?: number,
			greaterThanOrEqualTo?: number,
			equalTo?: number,
			lessThanOrEqualTo?: number,
			lessThan?: number,
			divisibleBy?: number,
			odd?: boolean,
			even?: boolean
		}
	};
}
