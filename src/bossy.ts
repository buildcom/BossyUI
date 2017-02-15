import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendar}  from './components/calendar';
import {BossyFormInput} from './components/form-input';
import {BossyForm} from './components/form';
import {BossyFormLabel} from './components/form-label';
import {BossyFormInputError} from './components/form-input-error';
import {TammiFleetExampleComponent} from './components/tammi-name';
import {MyronKantExampleComponent} from './components/myron';
import {LukeShortExampleComponent} from './components/luke-short-name-example';
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
		MyronKantExampleComponent,
    LukeShortExampleComponent,
		TammiFleetExampleComponent
		TylerComponent

  ],
  exports: [
    BossyCalendar,
    BossyFormInput,
    BossyForm,
		MyronKantExampleComponent,
    LukeShortExampleComponent,
		TammiFleetExampleComponent
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
