import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendar}  from './components/calendar';
import {BossyFormInput} from './components/form-input';
import {BossyForm} from './components/form';
import {BossyFormLabel} from './components/form-label';
import {BossyFormInputError} from './components/form-input-error';
import {BossyDropdown} from './components/dropdown';
import {BossyDropdownMenuItem} from './components/dropdown-menu';

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
		BossyDropdown,
		BossyDropdownMenuItem

	],
	exports: [
		BossyCalendar,
		BossyFormInput,
		BossyForm,
		BossyDropdown,
		BossyDropdownMenuItem
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
