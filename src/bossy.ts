import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendar}  from './components/calendar';
import {BossyFormInput} from './components/form-input';
import {BossyForm} from './components/form';
import {BossyFormLabel} from './components/form-label';
import {BossyRadio} from './components/radio';
import {BossyDropdown} from './components/dropdown';
import {BossyDropdownMenuItem} from './components/dropdown-menu';
import {BossyFormInputError} from './components/form-input-error';
import {BossyFormSelectMenu} from './components/form-selectmenu';
import {BossyFormTextarea} from './components/bossy-form-textarea';

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
		BossyRadio,
		BossyDropdown,
		BossyDropdownMenuItem,
		BossyFormInputError,
		BossyFormSelectMenu,
    		BossyFormTextarea
	],
	exports: [
		BossyCalendar,
		BossyFormInput,
		BossyForm,
		BossyRadio,
		BossyDropdown,
		BossyDropdownMenuItem,
		BossyFormSelectMenu,
    		BossyFormTextarea
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
