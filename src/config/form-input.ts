import {FormGroup} from '@angular/forms';
import {BossyFormValidatorConfig} from './form-validator';

export class BossyFormInputConfig {
	constructor(
		public name: string,
		public type: string,
		public value?: string,
		public validate?: BossyFormValidatorConfig,
		public id?: string,
		public cssClass?: string,
		public required?: string,
		public label?: string,
		public rows?: number,
		public cols?: number,
		public placeholder?: string,
		public formGroup?: FormGroup
	) {}
}
