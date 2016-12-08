import {Component} from '@angular/core';
import {BossyCalendarConfig} from '../../dist/config/calendar';
import {BossyFormInputConfig} from '../../dist/config/form-input';
import {BossyFormConfig} from '../../dist/config/form';
import {BossyFormValidatorsConfig} from '../../dist/config/form-validators';

declare const Components: Array<BossyFormInputConfig>;
declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'sandbox-app',
	templateUrl: '../templates/app.component.html',
	outputs: ['calendarConfig', 'formInputConfig', 'formConfig']
})
export class AppComponent {
	components: Array<any> = Components;

	calendarConfig: BossyCalendarConfig;
	formInputConfig: BossyFormInputConfig;
	formConfig:  BossyFormConfig;

	ngOnInit() {
		this.calendarConfig = new BossyCalendarConfig();
		this.formInputConfig = new BossyFormInputConfig('formInput', 'text');
		this.formConfig = new BossyFormConfig([
			new BossyFormInputConfig('textInput', 'text', 'test value for text',
				new BossyFormValidatorsConfig(1, 'short test', 10, 'long test')),
			new BossyFormInputConfig('textareaInput', 'textarea', 'test value for textarea'),
			new BossyFormInputConfig('emailInput', 'email', null,
				new BossyFormValidatorsConfig(null, null, null, null, null, null, true, true))
		]);
	}
}
