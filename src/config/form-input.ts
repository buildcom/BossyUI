import {FormGroup} from '@angular/forms';
import {BossyFormInputValidatorConfig} from './form-validator';

export class BossyFormInputConfig {
	constructor(
		public name: string,
		public type: string,
		public value?: string,
		public validatejs?: BossyFormInputValidatorConfig,
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
