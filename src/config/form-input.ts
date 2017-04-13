import {FormGroup} from '@angular/forms';
import {BossyFormInputValidatorConfig} from './form-input-validator';
import {BossyFormLabelConfig} from './form-label';

export class BossyFormInputConfig {
	constructor(
		public name: string,
		public type: string,
		public value?: string,
		public validatejs?: BossyFormInputValidatorConfig,
		public label?: BossyFormLabelConfig,
		public id?: string,
		public cssClass?: string,
		public errorCssClass?: string,
		public rows?: number,
		public cols?: number,
		public placeholder?: string,
		public formGroup?: FormGroup,
		public hasSuccess?: boolean,
		public hasWarning?: boolean,
		public hasDanger?: boolean
	) {}
}
