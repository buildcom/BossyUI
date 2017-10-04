import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendarComponent} from './components/calendar/calendar';
import {BossyFormInputComponent} from './components/form-input/form-input';
import {BossyFormComponent} from './components/form/form';
import {BossyFormLabelComponent} from './components/form-label/form-label';
import {BossyFormRadioComponent} from './components/form-radio/form-radio';
import {BossyDropdownComponent} from './components/dropdown/dropdown';
import {BossyDropdownMenuItemComponent} from './components/dropdown-menu/dropdown-menu';
import {BossyFormInputErrorComponent} from './components/form-input-error/form-input-error';
import {BossyFormSelectMenuComponent} from './components/form-selectmenu/form-selectmenu';
import {BossyFormTextareaComponent} from './components/form-textarea/form-textarea';
import {BossySliderComponent} from './components/slider/slider';
import {BossyMaskDirective} from './directives/bossy-mask.directive';

export {BossyCalendarComponent} from './components/calendar/calendar';
export {BossyCalendarConfig} from './config/calendar';

export {BossyFormComponent} from './components/form/form';
export {BossyFormConfig} from './config/form';
export {BossyFormInputComponent} from './components/form-input/form-input';
export {BossyFormInputConfig} from './config/form-input';
export {BossyFormLabelComponent} from './components/form-label/form-label';
export {BossyFormLabelConfig} from './config/form-label';
export {BossyFormSelectMenuComponent} from './components/form-selectmenu/form-selectmenu';
export {BossyFormSelectMenuConfig} from './config/form-selectmenu';
export {BossyFormInputErrorComponent} from './components/form-input-error/form-input-error';

export {BossyFormRadioComponent} from './components/form-radio/form-radio';
export {BossyFormRadioConfig} from './config/form-radio';
export {BossyDropdownComponent} from './components/dropdown/dropdown';
export {BossyDropdownConfig} from './config/dropdown';

export {BossyDropdownMenuItemComponent} from './components/dropdown-menu/dropdown-menu';
export {BossyDropdownMenuItemConfig} from './config/dropdown-menu';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    BossyCalendarComponent,
    BossyFormInputComponent,
    BossyFormComponent,
    BossyFormLabelComponent,
    BossyFormRadioComponent,
    BossyDropdownComponent,
    BossyDropdownMenuItemComponent,
    BossyFormInputErrorComponent,
    BossyFormSelectMenuComponent,
    BossyFormTextareaComponent,
    BossySliderComponent,
    BossyMaskDirective
  ],
  exports: [
    BossyCalendarComponent,
    BossyFormInputComponent,
    BossyFormComponent,
    BossyFormRadioComponent,
    BossyDropdownComponent,
    BossyDropdownMenuItemComponent,
    BossyFormSelectMenuComponent,
    BossyFormTextareaComponent
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
