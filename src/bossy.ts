import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendar}  from './components/calendar';
import {BossyFormInput} from './components/form-input';
import {BossyForm} from './components/form';
import {BossyFormLabel} from './components/form-label';
import {BossyFormInputError} from './components/form-input-error';
import {TammiFleetExampleComponent} from './components/tammi-name';
import {SamMillerExampleComponent} from './components/sam-miller-name-example';
import {TylerComponent} from './components/tylercomponent';
import {BossyRadio} from './components/radio';

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
		TammiFleetExampleComponent,
		SamMillerExampleComponent,
		TylerComponent,
		BossyRadio

	],
	exports: [
		BossyCalendar,
		BossyFormInput,
		BossyForm,
		TammiFleetExampleComponent,
		SamMillerExampleComponent,
		TylerComponent,
		BossyRadio
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
