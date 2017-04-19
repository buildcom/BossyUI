import {Component} from '@angular/core';
import {ConfigService} from './config.service';
import {BossyCalendarConfig} from '../../dist/config/calendar';
import {BossyCalendar} from '../../dist/components/calendar';
import {BossyFormInputConfig} from '../../dist/config/form-input';
import {BossyFormInput} from '../../dist/components/form-input';
import {BossyFormConfig} from '../../dist/config/form';
import {BossyForm} from '../../dist/components/form';
import {BossyFormInputValidatorConfig} from '../../dist/config/form-input-validator';
import {BossyFormLabelConfig} from '../../dist/config/form-label';
import {BossyFormRadio} from '../../dist/components/form-radio';
import {BossyFormRadioConfig} from '../../dist/config/form-radio';
import {BossyDropdown} from '../../dist/components/dropdown';
import {BossyDropdownConfig} from '../../dist/config/dropdown';
import {BossyDropdownMenuItem} from '../../dist/components/dropdown-menu';
import {BossyDropdownMenuItemConfig} from '../../dist/config/dropdown-menu';

 // import {BossyFormInputConfig2} from '../../dist/config/form-input2';
 // import {BossyFormInput2} from '../../dist/components/form-input2';

declare const Components: Array<BossyFormInputConfig>;
declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'sandbox-app',
	templateUrl: '../templates/app.component.html',
	providers: [ConfigService]
})
export class AppComponent {
	components: Array<any> = Components;
	bossyCalendar = BossyCalendar;
	bossyForm = BossyForm;
	bossyFormRadio = BossyFormRadio;
	bossyDropdown = BossyDropdown;
	bossyDropdownMenuItem = BossyDropdownMenuItem;
	bossyFormInput = BossyFormInput;

	constructor(
		private configService: ConfigService
	) {}

	ngOnInit() {
		const calendarConfig = new BossyCalendarConfig();
		const formConfig = new BossyFormConfig(
			[
 // new BossyFormInputConfig2('radio', 'idForRadio1',
 // new BossyFormRadioConfig(['lions', 'tigers', 'bears', 'porcupines'], false, 'uniqueId', [false, false, true, false])),
				new BossyFormInputConfig('textInput', 'text', 'test value for text', undefined,
					new BossyFormLabelConfig('text label test', true, false, false, false), undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, false, false),
				new BossyFormInputConfig('textareaInput', 'textarea', 'test value for textarea', undefined, undefined, '', '', 'a label', 5, 10, undefined, undefined, false, false, false),
				new BossyFormInputConfig('emailInput', 'email', 'test value for email',
					new BossyFormInputValidatorConfig({message: 'bossy email test not valid'}, {minimum: 3, maximum: 15}), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, false, false),
				new BossyFormInputConfig('radioButton', 'radio', undefined,
					undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, false, false,
					new BossyFormRadioConfig(['lions', 'tigers', 'bears', 'porcupines'], false, 'uniqueId', [false, false, true, false]))
			],
		);
		// Old radio separate from the Form
		const bossyFormRadioConfig = new BossyFormRadioConfig(['lions', 'tigers', 'bears'], false, 'uniqueId', [false, false, true]);

		this.configService.setConfig('calendarConfig', calendarConfig);
		this.configService.setConfig('formConfig', formConfig);
		this.configService.setConfig('bossyFormRadioConfig', bossyFormRadioConfig);

		const FormInputConfig = new BossyFormInputConfig('Input', 'text');
		const dropdownConfig = new BossyDropdownConfig( 'Dropdown Menu', 'button',
			[
				new BossyDropdownMenuItemConfig('button', 'Item 1', '#', false),
				new BossyDropdownMenuItemConfig('button', 'Item 2'),
				new BossyDropdownMenuItemConfig('button', 'Item 3')
			],
		false, 'large', undefined, false, 'primary');

		this.configService.setConfig('calendarConfig', calendarConfig);
		this.configService.setConfig('formConfig', formConfig);
		this.configService.setConfig('FormInputConfig', FormInputConfig);
		this.configService.setConfig('dropdownConfig', dropdownConfig);
	}
}
