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
import {BossyRadio} from '../../dist/components/radio';
import {BossyRadioConfig} from '../../dist/config/radio';
import {BossyDropdown} from '../../dist/components/dropdown';
import {BossyDropdownConfig} from '../../dist/config/dropdown';
import {BossyDropdownMenuItem} from '../../dist/components/dropdown-menu';
import {BossyDropdownMenuItemConfig} from '../../dist/config/dropdown-menu';
import {BossyFormSelectMenu} from '../../dist/components/form-selectmenu';
import {BossyFormSelectMenuConfig} from '../../dist/config/form-selectmenu';
import {MenuItem} from '../../dist/config/form-selectmenu';

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
	bossyRadio = BossyRadio;
	bossyDropdown = BossyDropdown;
	bossyDropdownMenuItem = BossyDropdownMenuItem;
	bossyFormInput = BossyFormInput;
	bossyFormSelectMenu = BossyFormSelectMenu;

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
				name: 'selectmenu',
				type: 'selectmenu',
				selectmenu: new BossyFormSelectMenuConfig({title: 'Vegetables',
					items:
					[
						{value : 'carrot'},
						{value : 'celery', isDisabled : true},
						{value : 'potato'}
					],
				})
			};

		const formConfig = new BossyFormConfig(
			[
				new BossyFormInputConfig(formInput1),
				new BossyFormInputConfig(formInput2),
				new BossyFormInputConfig(formInput3),
				new BossyFormInputConfig(formInput5)
			],
		);
		const formInputConfig = new BossyFormInputConfig(formInput4);
		const bossyRadioConfig = new BossyRadioConfig(['lions', 'tigers', 'bears'], false, 'uniqueId');
		const dropdownConfig = new BossyDropdownConfig( 'Dropdown Menu', 'button',
			[
				new BossyDropdownMenuItemConfig('button', 'Item 1', '#', false),
				new BossyDropdownMenuItemConfig('button', 'Item 2'),
				new BossyDropdownMenuItemConfig('button', 'Item 3')
			],
			false, 'large', undefined, false, 'primary');

		const selectMenuConfig = new BossyFormSelectMenuConfig( {title: 'State',
			items:
			[
				{value : 'California'},
				{value : 'Nevada', isDisabled : true},
				{value : 'Oregon'}
			]}
		);

		this.configService.setConfig('calendarConfig', calendarConfig);
		this.configService.setConfig('formConfig', formConfig);
		this.configService.setConfig('FormInputConfig', formInputConfig);
		this.configService.setConfig('bossyRadioConfig', bossyRadioConfig);
		this.configService.setConfig('dropdownConfig', dropdownConfig);
		this.configService.setConfig('selectMenuConfig', selectMenuConfig);
	}
}
