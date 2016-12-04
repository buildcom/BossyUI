import { FormControl } from '@angular/forms';

export class BossyFormValidator{
	//npm install --save validate.js
	private validate = require("node_modules/validate.js/validate.js");
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
		let validate = this.validate({[this.controlName]:`${control}`}, this.constraints);
		if (validate === undefined){
			return null;
		}
		else{
			return {valid: false};
		}
	};
}

/*
Example
	let validateText = new BossyFormValidator('someTextKey', {min:2, max:10})
	let validateEmail = new BossyFormValidator('someEmailKey',{email: true})

	formBuilder.group({
		someTextKey: [null, validateText.validateElement],
		someEmailKey: [null, validateEmail.validateElement]
	})
 */