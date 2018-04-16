import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { BossyCalendarComponent } from './components/calendar/calendar.component';
import { BossyFormElementComponent } from './components/form-element/form-element.component';
import { BossyFormComponent } from './components/form/form.component';
import { BossyFormLabelComponent } from './components/form-label/form-label.component';
import { BossyFormRadioComponent } from './components/form-radio/form-radio.component';
import { BossyDropdownComponent } from './components/dropdown/dropdown.component';
import { BossyDropdownMenuItemComponent } from './components/dropdown-menu/dropdown-menu.component';
import { BossyFormElementErrorComponent } from './components/form-element-error/form-element-error.component';
import { BossyFormSelectMenuComponent } from './components/form-selectmenu/form-selectmenu.component';
import { BossyFormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { BossyCollapseComponent } from './components/collapse/collapse.component';
import { BossySliderComponent } from './components/slider/slider.component';
import { BossyMaskDirective } from './directives/bossy-mask.directive';
import { BossyPopoverComponent } from './components/popover/popover.component';
import { BossyAlertComponent } from './components/alert/alert.component';
import { ExampleComponent } from './components/example/example.component';

export {
  BossyCalendarComponent
} from './components/calendar/calendar.component';
export { BossyCalendarConfig } from './components/calendar/calendar.config';
export { BossyAlertComponent } from './components/alert/alert.component';
export { BossyAlertConfig } from './components/alert/alert.config';

export { BossyFormComponent } from './components/form/form.component';
export { BossyFormConfig } from './components/form/form.config';
export {
  BossyFormElementComponent
} from './components/form-element/form-element.component';
export {
  BossyFormElementConfig
} from './components/form-element/form-element.config';
export {
  BossyFormLabelComponent
} from './components/form-label/form-label.component';
export {
  BossyFormLabelConfig
} from './components/form-label/form-label.config';
export {
  BossyFormSelectMenuComponent
} from './components/form-selectmenu/form-selectmenu.component';
export {
  BossyFormSelectMenuConfig
} from './components/form-selectmenu/form-selectmenu.config';
export {
  BossyFormElementErrorComponent
} from './components/form-element-error/form-element-error.component';

export {
  BossyFormRadioComponent
} from './components/form-radio/form-radio.component';
export {
  BossyFormRadioConfig
} from './components/form-radio/form-radio.config';
export {
  BossyDropdownComponent
} from './components/dropdown/dropdown.component';
export { BossyDropdownConfig } from './components/dropdown/dropdown.config';
export {
  BossyCollapseComponent
} from './components/collapse/collapse.component';
export { BossyCollapseConfig } from './components/collapse/collapse.config';

export {
  BossyDropdownMenuItemComponent
} from './components/dropdown-menu/dropdown-menu.component';
export {
  BossyDropdownMenuConfig
} from './components/dropdown-menu/dropdown-menu.config';

export { BossyPopoverComponent } from './components/popover/popover.component';
export { BossyPopoverConfig } from './components/popover/popover.config';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, BrowserAnimationsModule],
  declarations: [
    BossyCalendarComponent,
    BossyAlertComponent,
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
    BossyCollapseComponent,
    BossyPopoverComponent,
    ExampleComponent
  ],
  exports: [
    BossyCalendarComponent,
    BossyAlertComponent,
    BossyFormElementComponent,
    BossyFormComponent,
    BossyFormRadioComponent,
    BossyDropdownComponent,
    BossyDropdownMenuItemComponent,
    BossyFormSelectMenuComponent,
    BossyFormTextareaComponent,
    BossyFormElementErrorComponent,
    BossyCollapseComponent,
    BossyPopoverComponent,
    ExampleComponent
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
