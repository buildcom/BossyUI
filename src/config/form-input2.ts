// Import required angular code for forms.
import {FormGroup} from '@angular/forms';
// Import Configs for Bossy Components
import {BossyFormInputValidatorConfig} from './form-input-validator';
import {BossyFormLabelConfig} from './form-label';
import {BossyFormRadioConfig} from './form-radio';

export class BossyFormInputConfig2 {
	constructor(
		public name: string,  // This is the name corresponding to the component (i.e. calendar)
		public id: string,    // id for this component
		public object: object // The object itself (i.e. 1 BossyCalendar component)
	) {}
}
