import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendar}  from './components/calendar';
import {BossyFormInput} from './components/form-input';
import {BossyForm} from './components/form';
import {BossyFormLabel} from './components/form-label';
import {BossyFormInputError} from './components/form-input-error';
import {MyronExampleComponent} from './components/myron-component';
import {TammiFleetExampleComponent} from './components/tammi-name';
import {LukeShortExampleComponent} from './components/luke-short-name-example';
import {SamMillerExampleComponent} from './components/sam-miller-name-example';
import {TylerComponent} from './components/tylercomponent';

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule
	],
	declarations: [
		BossyCalendar,
		BossyFormInput,
		BossyForm,
		BossyFormLabel,
		BossyFormInputError,
		MyronExampleComponent,
		LukeShortExampleComponent,
		TammiFleetExampleComponent,
		SamMillerExampleComponent,
		TylerComponent
	],
	exports: [
		BossyCalendar,
		BossyFormInput,
		BossyForm,
		MyronExampleComponent,
		LukeShortExampleComponent,
		TammiFleetExampleComponent,
		SamMillerExampleComponent,
		TylerComponent
	]

})
export class BossyModule {
	static forRoot() {
		return {
			ngModule: BossyModule,
			providers: []
		};
	}
}
