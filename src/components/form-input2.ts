import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BossyFormInputConfig2} from '../config/form-input2';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form-input',
	templateUrl: '../templates/form-input.html',
	styleUrls: ['../styles/form-input.css'],
})
export class BossyFormInput2 {
	@Input() config: BossyFormInputConfig2;
}



/*

	hasSuccess: boolean = false;
	hasWarning: boolean = false;
	hasDanger: boolean = false;

	constructor() {
	}

	ngOnInit() {
		const {name, value, formGroup} = this.config;

		if (formGroup) {
			console.log('formgroup', name);

			formGroup.addControl(name, new FormControl(value));
		}
	}

	output() {
	}
*/
