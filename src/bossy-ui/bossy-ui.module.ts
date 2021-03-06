import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {BossyBreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {BossyBreadcrumbConfig} from './components/breadcrumb/breadcrumb.config';
import {BossyCalendarComponent} from './components/calendar/calendar.component';
import {BossyFormElementComponent} from './components/form-element/form-element.component';
import {BossyFormComponent} from './components/form/form.component';
import {BossyFormLabelComponent} from './components/form-label/form-label.component';
import {BossyFormRadioComponent} from './components/form-radio/form-radio.component';
import {BossyDropdownComponent} from './components/dropdown/dropdown.component';
import {BossyDropdownMenuItemComponent} from './components/dropdown-menu/dropdown-menu.component';
import {BossyFormElementErrorComponent} from './components/form-element-error/form-element-error.component';
import {BossyFormSelectMenuComponent} from './components/form-selectmenu/form-selectmenu.component';
import {BossyFormTextareaComponent} from './components/form-textarea/form-textarea.component';
import {BossyCollapseComponent} from './components/collapse/collapse.component';
import {BossySliderComponent} from './components/slider/slider.component';
import {BossyMaskDirective} from './directives/bossy-mask.directive';
import {BossyAlertComponent} from './components/alert/alert.component';
import {BossyAlertConfig} from './components/alert/alert.config';
import {BossyModalComponent} from './components/modal/modal.component';
import {BossyModalConfig} from './components/modal/modal.config';
import {BossyPopoverComponent} from './components/popover/popover.component';
import {BossyPopoverConfig} from './components/popover/popover.config';
import {BossyButtonComponent} from './components/button/button.component';
import {BossyButtonConfig} from './components/button/button.config';
import {BossyNavsComponent} from './components/navs/navs.component';
import {BossyNavsConfig} from './components/navs/navs.config';
import {BossyNavTabComponent} from './components/navs/nav-tab.component';
import {BossyCarouselComponent} from './components/carousel/carousel.component';
import {BossyCarouselConfig} from './components/carousel/carousel.config';
import {BossyPaginationComponent} from './components/pagination/pagination.component';
import {BossyPaginationConfig} from './components/pagination/pagination.config';
import {BossyPagesComponent} from './components/pagination/pages.component';
import {BossyNavBarComponent} from './components/nav-bar/nav-bar.component';
import {BossyNavBarConfig} from './components/nav-bar/nav-bar.config';


export {BossyBreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
export {BossyBreadcrumbConfig} from './components/breadcrumb/breadcrumb.config';
export {BossyCalendarComponent} from './components/calendar/calendar.component';
export {BossyCalendarConfig} from './components/calendar/calendar.config';
export {BossyAlertComponent} from './components/alert/alert.component';
export {BossyAlertConfig} from './components/alert/alert.config';
export {BossyModalComponent} from './components/modal/modal.component';
export {BossyModalConfig} from './components/modal/modal.config';
export {BossyNavsComponent} from './components/navs/navs.component';
export {BossyNavsConfig} from './components/navs/navs.config';
export {BossyNavTabComponent} from './components/navs/nav-tab.component';
export {BossyCarouselComponent} from './components/carousel/carousel.component';
export {BossyCarouselConfig} from './components/carousel/carousel.config';
export {BossyNavBarComponent} from './components/nav-bar/nav-bar.component';
export {BossyNavBarConfig} from './components/nav-bar/nav-bar.config';

export {BossyFormComponent} from './components/form/form.component';
export {BossyFormConfig} from './components/form/form.config';
export {BossyFormElementComponent} from './components/form-element/form-element.component';
export {BossyFormElementConfig} from './components/form-element/form-element.config';
export {BossyFormLabelComponent} from './components/form-label/form-label.component';
export {BossyFormLabelConfig} from './components/form-label/form-label.config';
export {BossyFormSelectMenuComponent} from './components/form-selectmenu/form-selectmenu.component';
export {BossyFormSelectMenuConfig} from './components/form-selectmenu/form-selectmenu.config';
export {BossyFormElementErrorComponent} from './components/form-element-error/form-element-error.component';

export {BossyFormRadioComponent} from './components/form-radio/form-radio.component';
export {BossyFormRadioConfig} from './components/form-radio/form-radio.config';
export {BossyDropdownComponent} from './components/dropdown/dropdown.component';
export {BossyDropdownConfig} from './components/dropdown/dropdown.config';
export {BossyCollapseComponent} from './components/collapse/collapse.component';
export {BossyCollapseConfig} from './components/collapse/collapse.config';

export {BossyDropdownMenuItemComponent} from './components/dropdown-menu/dropdown-menu.component';
export {BossyDropdownMenuConfig} from './components/dropdown-menu/dropdown-menu.config';

export {BossyPopoverComponent} from './components/popover/popover.component';
export {BossyPopoverConfig} from './components/popover/popover.config';

export {BossyButtonComponent} from './components/button/button.component';
export {BossyButtonConfig} from './components/button/button.config';

export {BossyPaginationComponent} from './components/pagination/pagination.component';
export {BossyPaginationConfig} from './components/pagination/pagination.config';
export {BossyPagesComponent} from './components/pagination/pages.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    BossyBreadcrumbComponent,
    BossyCalendarComponent,
    BossyAlertComponent,
    BossyModalComponent,
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
    BossyButtonComponent,
    BossyPaginationComponent,
    BossyPagesComponent,
    BossyNavsComponent,
    BossyNavTabComponent,
    BossyCarouselComponent,
    BossyPaginationComponent,
    BossyPagesComponent,
    BossyNavBarComponent
  ],
  exports: [
    BossyBreadcrumbComponent,
    BossyCalendarComponent,
    BossyAlertComponent,
    BossyModalComponent,
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
    BossyButtonComponent,
    BossyNavsComponent,
    BossyNavTabComponent,
    BossyCarouselComponent,
    BossyPaginationComponent,
    BossyPagesComponent,
    BossyNavBarComponent
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
