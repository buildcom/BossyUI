import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-input-error',
	templateUrl: '../templates/input-error.html',
	styleUrls: ['../styles/input-error.css']
})
export class BossyInputError {
	@Input() controlName: string;
	@Input() formGroup: FormGroup;
	@Input() errorCssClass: string;
}
