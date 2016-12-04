import { FormControl } from '@angular/forms';

export class BossyFormValidator{
	private controlName: string;
	private constraints: {};

	constructor(controlName: string,
	            validate?:{minLength?:number, maxLength?:number, email?: boolean}){
		this.controlName = controlName;
		this.constraints = {
			[controlName] : {
				length: {maximum: validate.maxLength, minimum: validate.minLength},
				email: validate.email === undefined ? false : validate.email
			}
		};
	}
	validateElement = (control: FormControl) => {
		let validate = require("node_modules/validate.js/validate.js");
		let validation = validate({[this.controlName]:control}, this.constraints);
		if (validation === undefined){
			return null;
		}
		else{
			return {errorMessage: validation};
		}
	};
}