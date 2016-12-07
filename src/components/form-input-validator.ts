import { Component, Input } from '@angular/core';
import { BossyFormInputValidatorConfig } from '../config/form-input-validator';
import { FormGroup } from '@angular/forms';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form-input-validator',
	templateUrl: '../templates/form-input-validator.html'
})
export class BossyFormInputValidator {
	@Input() formGroup: FormGroup;
	@Input() validators: any;
	@Input() elementName: string;

	ngOnInit(){
		if (this.validators !== undefined){
			let valid = new BossyFormInputValidatorConfig(this.elementName, this.validators);
			this.formGroup.controls[this.elementName].setValidators(valid.validateElement);
		}
	}

}