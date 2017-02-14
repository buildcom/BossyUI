import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendar}  from './components/calendar';
import {BossyFormInput} from './components/form-input';
import {BossyForm} from './components/form';
import {BossyFormLabel} from './components/form-label';
import {BossyFormInputError} from './components/form-input-error';
<<<<<<< HEAD
import {TylerComponent} from './components/tylercomponent'

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
		TylerComponent,

	],
	exports: [
		BossyCalendar,
		BossyFormInput,
		BossyForm,
		TylerComponent
	]
=======
import {MyronKantExampleComponent} from './components/myron';
import {LukeShortExampleComponent} from './components/luke-short-name-example';

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
		MyronKantExampleComponent,
    LukeShortExampleComponent
  ],
  exports: [
    BossyCalendar,
    BossyFormInput,
    BossyForm,
		MyronKantExampleComponent,
    LukeShortExampleComponent
  ]

>>>>>>> 884d22e82599cbfc57bada2d3ed6bd5673039014
})
export class BossyModule {
  static forRoot() {
    return {
      ngModule: BossyModule,
      providers: []
    };
  }
}
