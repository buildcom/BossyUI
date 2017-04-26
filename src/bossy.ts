import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendar}  from './components/calendar';
import {BossyFormInput} from './components/form-input';
import {BossyForm} from './components/form';
import {BossyFormLabel} from './components/form-label';
import {BossyFormRadio} from './components/form-radio';
import {BossyDropdown} from './components/dropdown';
import {BossyDropdownMenuItem} from './components/dropdown-menu';
import {BossyFormInputError} from './components/form-input-error';
import {BossyFormSelectMenu} from './components/form-selectmenu';

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
		BossyFormRadio,
		BossyDropdown,
		BossyDropdownMenuItem,
		BossyFormInputError,
		BossyFormSelectMenu
	],
	exports: [
		BossyCalendar,
		BossyFormInput,
		BossyForm,
		BossyFormRadio,
		BossyDropdown,
		BossyDropdownMenuItem,
		BossyFormSelectMenu
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
