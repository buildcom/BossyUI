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
import {LukeShortExampleComponent} from '../../dist/components/luke-short-name-example';
import {LukeShortExampleComponentConfig} from '../../dist/config/luke-short-name-example-config';
import {MyronExampleComponent} from '../../dist/components/myron-component';
import {MyronExampleComponentConfig} from '../../dist/config/myron-config';

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
	bossyFormInput = BossyFormInput;
	myronExampleComponent = MyronExampleComponent;
	lukeShortExampleComponent = LukeShortExampleComponent;

	constructor(
		private configService: ConfigService
	) {}

	ngOnInit() {
		const calendarConfig = new BossyCalendarConfig();
		const formConfig = new BossyFormConfig(
			[
				new BossyFormInputConfig('textInput', 'text', 'test value for text', undefined,
				new BossyFormLabelConfig('text label test', true)),
				new BossyFormInputConfig('textareaInput', 'textarea', 'test value for textarea', undefined , undefined, '', '', 'a label', 5, 10),
				new BossyFormInputConfig('emailInput', 'email', 'test value for email',
				new BossyFormInputValidatorConfig({message: 'bossy email test not valid'}, {minimum: 3, maximum: 15}))
			],
			false
		);
		const formInputConfig = new BossyFormInputConfig('formInput', 'text');
		const myronExampleComponentConfig = new MyronExampleComponentConfig('Myron Kant', ['Reading', 'Left 4 Dead 2', 'Triathlon'], 'lightgreen');
		const lukeShortExampleComponentConfig = new LukeShortExampleComponentConfig('Luke Short', ['Yoga', 'pr0gramming', 'Mountain Biking', 'Star Wars'], 'BurlyWood');

		this.configService.setConfig('calendarConfig', calendarConfig);
		this.configService.setConfig('formConfig', formConfig);
		this.configService.setConfig('formInputConfig', formInputConfig);
		this.configService.setConfig('myronExampleComponentConfig', myronExampleComponentConfig);
		this.configService.setConfig('lukeShortExampleComponentConfig', lukeShortExampleComponentConfig);
	}
}
