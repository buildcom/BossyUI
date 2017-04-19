import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BossyFormTextareaConfig} from '../config/bossy-form-textarea';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form-textarea',
	templateUrl: '../templates/bossy-form-textarea.html',
	styleUrls: ['../styles/bossy-form-textarea.css'],
})
export class BossyFormTextarea {
	@Input() config: BossyFormTextareaConfig;
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
