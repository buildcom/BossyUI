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

	constructor(private configService: ConfigService) {
	}

	ngOnInit() {
		const calendarConfig = new BossyCalendarConfig();
		const formInput1 = {
				name: 'textInput',
				type: 'text',
				value: 'test value for text',
				label: new BossyFormLabelConfig('text label test', true, false, false, false)
			},
			formInput2 = {
				name: 'textareaInput',
				type: 'textarea',
				value: 'test value for textarea',
				rows: 5,
				cols: 10
			},
			formInput3 = {
				name: 'emailInput',
				type: 'email',
				value: 'test value for email',
				validatejs: new BossyFormInputValidatorConfig({message: 'bossy email test not valid'}, {
					minimum: 3,
					maximum: 15
				}),
			},
			formInput4 = {
				name: 'Input',
				type: 'text'
			},
			formInput5 = {
				name: 'radio',
				type: 'radio',
				radio: new BossyFormRadioConfig(['lions', 'tigers', 'bears'], false, 'uniqueId', [false, false, true])
			};

		const formConfig = new BossyFormConfig(
			[
				new BossyFormInputConfig(formInput1),
				new BossyFormInputConfig(formInput2),
				new BossyFormInputConfig(formInput3),
				new BossyFormInputConfig(formInput4),
				new BossyFormInputConfig(formInput5)
			],
		);

		// Radio component independent of form
		const bossyFormRadioConfig = new BossyFormRadioConfig(['lions', 'tigers', 'bears'], false, 'uniqueId', [false, false, true]);
		const formInputConfig = new BossyFormInputConfig(formInput4);
		const dropdownConfig = new BossyDropdownConfig('Dropdown Menu', 'button',
			[
				new BossyDropdownMenuItemConfig('button', 'Item 1', '#', false),
				new BossyDropdownMenuItemConfig('button', 'Item 2'),
				new BossyDropdownMenuItemConfig('button', 'Item 3')
			],
			false, 'large', undefined, false, 'primary');

		this.configService.setConfig('calendarConfig', calendarConfig);
		this.configService.setConfig('formConfig', formConfig);
		this.configService.setConfig('FormInputConfig', formInputConfig);
		this.configService.setConfig('bossyFormRadioConfig', bossyFormRadioConfig);
		this.configService.setConfig('dropdownConfig', dropdownConfig);
	}
}
