import { FormControl } from '@angular/forms';

export class BossyFormInputValidatorConfig{
	private controlName: string;
	private constraint: Constraint;

	constructor(controlName: string,
	            validate?: {minimum?: number,
		            tooShort?: string,
		            maximum?: number,
		            tooLong?: string,
		            is?: number,
		            wrongLength?: string,
		            presence?: boolean,
		            email?: boolean,
		            emailMessage?: string,
		            regexp?: string,
		            regexpFlag?: string,
		            regexpMessage?: string
	            } ){
		this.controlName = controlName;
		this.constraint = { [controlName] : { } };

		this.constraint[controlName].presence = validate.presence;

		if (validate.minimum !== undefined || validate.maximum !== undefined || validate.is !== undefined){
			this.constraint[controlName].length = {};
			this.constraint[controlName].length.maximum = validate.maximum;
			this.constraint[controlName].length.tooLong = validate.tooLong;
			this.constraint[controlName].length.minimum = validate.minimum;
			this.constraint[controlName].length.tooShort = validate.tooShort;
			this.constraint[controlName].length.is = validate.is;
			this.constraint[controlName].length.wrongLength = validate.wrongLength;
		}
		if (validate.email !== undefined){
			this.constraint[controlName].email = {};
			this.constraint[controlName].email.message = validate.emailMessage;
		}
		if (validate.regexp !== undefined){
			this.constraint[controlName].format = {};
			this.constraint[controlName].format.pattern = validate.regexp;
			this.constraint[controlName].format.flag = validate.regexpFlag;
			this.constraint[controlName].format.message = validate.regexpMessage;
		}
	}
	validateElement = (control: FormControl) => {
		let validate = require("node_modules/validate.js/validate.js");
		let validation = validate({[this.controlName]: control.value}, this.constraint);
		if (validation === undefined){
			return null;
		}
		else{
			return {errorMessage: validation};
		}
	};
}

interface Constraint{
	[controlName:string] : {
		length?: {
			maximum?: number;
			tooLong?: string;
			minimum?: number;
			tooShort?: string;
			is?: number;
			wrongLength?: string;
		}
		email?: {
			message?: string;
		}
		format?: {
			pattern?: string;
			flag?: string;
			message?: string;
		}
		presence?: boolean;
	}
}