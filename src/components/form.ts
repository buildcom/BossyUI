import {Component, Input, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BossyFormConfig} from '../config/form';


declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form',
	templateUrl: '../templates/form.html',
	styleUrls: ['../styles/form.css'],
})
export class BossyForm {
	@Input() config: BossyFormConfig;
	bossyForm: FormGroup;
	isFormInlinedFromConfig: boolean = false;

	constructor(
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		const elements: any = {};

		this.isFormInlinedFromConfig = this.config.isFormInlined;

		this.config.elements.forEach((element) => {
			const { name, value } = element;
			elements[name] = value;
		});

		this.bossyForm = this.formBuilder.group(elements);
	}

	onSubmit() {
		// TODO: return form data
	}
}
