import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendar}  from './components/calendar';
import {BossyFormInput} from './components/form-input';
import {BossyForm} from './components/form';
import {BossyFormLabel} from './components/form-label';
import {BossyFormInputError} from './components/form-input-error';
<<<<<<< HEAD
import {MyronExampleComponent} from './components/myron-component';
=======
import {TammiFleetExampleComponent} from './components/tammi-name';
import {MyronKantExampleComponent} from './components/myron';
import {LukeShortExampleComponent} from './components/luke-short-name-example';
import {SamMillerExampleComponent} from './components/sam-miller-name-example';
import {TylerComponent} from './components/tylercomponent';
>>>>>>> e4a80178db23fd749da9744d8a3f4f2e19cf7273

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
<<<<<<< HEAD
		MyronExampleComponent,
=======
		MyronKantExampleComponent,
		LukeShortExampleComponent,
		TammiFleetExampleComponent,
		SamMillerExampleComponent,
		TylerComponent

>>>>>>> e4a80178db23fd749da9744d8a3f4f2e19cf7273
	],
	exports: [
		BossyCalendar,
		BossyFormInput,
		BossyForm,
<<<<<<< HEAD
		MyronExampleComponent,
=======
		MyronKantExampleComponent,
		LukeShortExampleComponent,
		TammiFleetExampleComponent,
		SamMillerExampleComponent,
		TylerComponent
>>>>>>> e4a80178db23fd749da9744d8a3f4f2e19cf7273
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
