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
import {LukeShortExampleComponent} from '../../dist/components/luke-short-name-example';
import {LukeShortExampleComponentConfig} from '../../dist/config/luke-short-name-example-config';


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
	bossyInput = BossyInput;
	lukeShortExampleComponent = LukeShortExampleComponent;

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
		const InputConfig = new BossyInputConfig('Input', 'text');
		const bossyTextAreaConfig = new BossyInputConfig('textareaInput', 'textarea', undefined, undefined, undefined, '', '', 'a label', 10, 50, undefined, undefined, undefined, undefined, undefined);
		const lukeShortExampleComponentConfig = new LukeShortExampleComponentConfig('Luke Short', ['Yoga', 'pr0gramming', 'Mountain Biking', 'Star Wars'], 'BurlyWood');

		this.configService.setConfig('calendarConfig', calendarConfig);
		this.configService.setConfig('formConfig', formConfig);
		this.configService.setConfig('InputConfig', InputConfig);
		this.configService.setConfig('bossyTextAreaConfig', bossyTextAreaConfig);
		this.configService.setConfig('lukeShortExampleComponentConfig', lukeShortExampleComponentConfig);
	}
}
