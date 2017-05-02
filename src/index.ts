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

//export {BossyCalendarModule} from './calendar/calendar-module';
export {BossyCalendar} from './components/calendar';
export {BossyCalendarConfig} from './config/calendar';

//export {BossyFormModule} from './form/form-module';
export {BossyForm} from './components/form';
export {BossyFormConfig} from './config/form';
export {BossyFormInput}  from './components/form-input';
export {BossyFormInputConfig} from './config/form-input';
export {BossyFormLabel}  from './components/form-label';
export {BossyFormLabelConfig} from './config/form-label';
export {BossyFormSelectMenu}  from './components/form-selectmenu';
export {BossyFormSelectMenuConfig} from './config/form-selectmenu';
export {BossyFormInputError}  from './components/form-input-error';

export {BossyRadio} from './components/radio';
export {BossyRadioConfig} from './config/radio';
export {BossyDropdown} from './components/dropdown';
export {BossyDropdownConfig} from './config/dropdown';

export {BossyDropdownMenuItem} from './components/dropdown-menu'
export {BossyDropdownMenuItemConfig} from './config/dropdown-menu';

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
		BossyFormSelectMenu
	],
	exports: [
		BossyCalendar,
		BossyFormInput,
		BossyForm,
		BossyRadio,
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
