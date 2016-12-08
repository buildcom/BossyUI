import {Component, Input} from '@angular/core';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form-input-error',
	templateUrl: '../templates/form-input-error.html',
	styleUrls: ['../styles/form-input-error.css']
})
export class BossyFormInputError {
	@Input() controlName;
	@Input() formGroup;
}
