import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendar}  from './components/calendar';
import {BossyInput} from './components/input';
import {BossyForm} from './components/form';
import {BossyFormLabel} from './components/form-label';
import {BossyInputError} from './components/input-error';
import {TammiFleetExampleComponent} from './components/tammi-name';
import {MyronKantExampleComponent} from './components/myron';
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
		BossyInput,
		BossyForm,
		BossyFormLabel,
		BossyInputError,
		MyronKantExampleComponent,
		LukeShortExampleComponent,
		TammiFleetExampleComponent,
		SamMillerExampleComponent,
		TylerComponent

	],
	exports: [
		BossyCalendar,
		BossyInput,
		BossyForm,
		MyronKantExampleComponent,
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
