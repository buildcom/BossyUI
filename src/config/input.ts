import {FormGroup} from '@angular/forms';
import {BossyInputValidatorConfig} from './input-validator';
import {BossyFormLabelConfig} from './form-label';

export class BossyInputConfig {
	constructor(
		public name: string,
		public type: string,
		public value?: string,
		public validatejs?: BossyInputValidatorConfig,
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
