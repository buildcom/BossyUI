import { FormControl } from '@angular/forms';

export class BossyFormInputValidatorConfig{
	private controlName: string;
	private constraint: Constraint;

	constructor(controlName:string,
	            validate?:{minLength?:number, maxLength?:number, email?:boolean}){
		this.controlName = controlName;
		this.constraint = {
			[controlName] : {
				length : {}
			}
		};

		this.constraint[controlName].length.maximum = validate.maxLength;
		this.constraint[controlName].length.minimum = validate.minLength;
		this.constraint[controlName].email = validate.email;
	}
	validateElement = (control: FormControl) => {
		let validate = require("node_modules/validate.js/validate.js");
		let validation = validate({[this.controlName]:control}, this.constraint);
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
		length:{
			maximum?:number;
			minimum?:number;
		}
		email?: boolean;
	}
}