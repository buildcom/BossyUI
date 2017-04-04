import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BossyInputConfig} from '../config/input';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-input',
	templateUrl: '../templates/input.html',
	styleUrls: ['../styles/input.css'],
		inputs: [
			'config'
		]
})
<<<<<<< HEAD:src/components/form-input.ts
export class BossyFormInput {
	@Input() config: BossyFormInputConfig;
=======
export class BossyInput {
	@Input() config: BossyInputConfig;
>>>>>>> master:src/components/input.ts
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
}
