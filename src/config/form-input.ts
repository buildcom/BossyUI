import {FormGroup} from '@angular/forms';
import {BossyFormLabelConfig} from './form-label';

export class BossyFormInputConfig {
	constructor(
		public name: string,
		public type: string,
		public value?: string,
		public label?: BossyFormLabelConfig,
		public id?: string,
		public cssClass?: string,
		public required?: string,
		public rows?: number,
		public cols?: number,
		public placeholder?: string,
		public formGroup?: FormGroup
	) {}
}
