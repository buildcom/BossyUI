import {Component} from '@angular/core';
import {ConfigService} from './config.service';
import {BossyCalendarConfig} from '../../dist/config/calendar';
import {BossyCalendar} from '../../dist/components/calendar';
import {BossyInputConfig} from '../../dist/config/input';
import {BossyInput} from '../../dist/components/input';
import {BossyFormConfig} from '../../dist/config/form';
import {BossyForm} from '../../dist/components/form';
import {BossyInputValidatorConfig} from '../../dist/config/input-validator';
import {BossyFormLabelConfig} from '../../dist/config/form-label';
import {BossyRadio} from '../../dist/components/radio';
import {BossyRadioConfig} from '../../dist/config/radio';
import {BossyDropdown} from '../../dist/components/dropdown';
import {BossyDropdownConfig} from '../../dist/config/dropdown';
import {BossyDropdownMenuItem} from '../../dist/components/dropdown-menu';
import {BossyDropdownMenuItemConfig} from '../../dist/config/dropdown-menu';

declare const Components: Array<BossyInputConfig>;
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
	bossyInput = BossyInput;

	constructor(
		private configService: ConfigService
	) {}

	ngOnInit() {
		const calendarConfig = new BossyCalendarConfig();
		const formConfig = new BossyFormConfig(
			[
				new BossyInputConfig('textInput', 'text', 'test value for text', undefined,
					new BossyFormLabelConfig('text label test', true, false, false, false), undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, false, false),
				new BossyInputConfig('textareaInput', 'textarea', 'test value for textarea', undefined, undefined, '', '', 'a label', 5, 10, undefined, undefined, false, false, false),
				new BossyInputConfig('emailInput', 'email', 'test value for email',
					new BossyInputValidatorConfig({message: 'bossy email test not valid'}, {minimum: 3, maximum: 15}), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, false, false)
			],
		);
		const bossyRadioConfig = new BossyRadioConfig(['lions', 'tigers', 'bears'], false, 'uniqueId');

		this.configService.setConfig('calendarConfig', calendarConfig);
		this.configService.setConfig('formConfig', formConfig);
		this.configService.setConfig('bossyRadioConfig', bossyRadioConfig);

		const InputConfig = new BossyInputConfig('Input', 'text');
		const dropdownConfig = new BossyDropdownConfig( 'Dropdown Menu', 'button',
			[
				new BossyDropdownMenuItemConfig('button', 'Item 1', '#', false),
				new BossyDropdownMenuItemConfig('button', 'Item 2'),
				new BossyDropdownMenuItemConfig('button', 'Item 3')
			],
		false, 'large', undefined, false, 'primary');

		this.configService.setConfig('calendarConfig', calendarConfig);
		this.configService.setConfig('formConfig', formConfig);
		this.configService.setConfig('InputConfig', InputConfig);
		this.configService.setConfig('dropdownConfig', dropdownConfig);
	}
}
