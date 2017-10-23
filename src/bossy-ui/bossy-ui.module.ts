import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyCalendarComponent} from './components/calendar/calendar';
import {BossyFormElementComponent} from './components/form-element/form-element';
import {BossyFormComponent} from './components/form/form';
import {BossyFormLabelComponent} from './components/form-label/form-label';
import {BossyFormRadioComponent} from './components/form-radio/form-radio';
import {BossyDropdownComponent} from './components/dropdown/dropdown';
import {BossyDropdownMenuItemComponent} from './components/dropdown-menu/dropdown-menu';
import {BossyFormElementErrorComponent} from './components/form-element-error/form-element-error';
import {BossyFormSelectMenuComponent} from './components/form-selectmenu/form-selectmenu';
import {BossyFormTextareaComponent} from './components/form-textarea/form-textarea';
import {BossySliderComponent} from './components/slider/slider';
import {BossyMaskDirective} from './directives/bossy-mask.directive';

export {BossyCalendarComponent} from './components/calendar/calendar';
export {BossyCalendarConfig} from './config/calendar';

export {BossyFormComponent} from './components/form/form';
export {BossyFormConfig} from './config/form';
export {BossyFormElementComponent} from './components/form-element/form-element';
export {BossyFormElementConfig} from './config/form-element';
export {BossyFormLabelComponent} from './components/form-label/form-label';
export {BossyFormLabelConfig} from './config/form-label';
export {BossyFormSelectMenuComponent} from './components/form-selectmenu/form-selectmenu';
export {BossyFormSelectMenuConfig} from './config/form-selectmenu';
export {BossyFormElementErrorComponent} from './components/form-element-error/form-element-error';

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
    BossyFormElementComponent,
    BossyFormComponent,
    BossyFormLabelComponent,
    BossyFormRadioComponent,
    BossyDropdownComponent,
    BossyDropdownMenuItemComponent,
    BossyFormElementErrorComponent,
    BossyFormSelectMenuComponent,
    BossyFormTextareaComponent,
    BossySliderComponent,
    BossyMaskDirective,
  ],
  exports: [
    BossyCalendarComponent,
    BossyFormElementComponent,
    BossyFormComponent,
    BossyFormRadioComponent,
    BossyDropdownComponent,
    BossyDropdownMenuItemComponent,
    BossyFormSelectMenuComponent,
    BossyFormTextareaComponent,
    BossyFormElementErrorComponent,
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
