import {
  Component,
  Input,
  ViewContainerRef,
  ViewChild,
  ReflectiveInjector,
  ComponentFactoryResolver
} from '@angular/core';
import {BossyCalendarComponent} from '../../bossy-ui/components/calendar/calendar.component';
import {BossyAlertComponent} from '../../bossy-ui/components/alert/alert.component';
import {BossyModalComponent} from '../../bossy-ui/components/modal/modal.component';
import {BossyFormComponent} from '../../bossy-ui/components/form/form.component';
import {BossyFormRadioComponent} from '../../bossy-ui/components/form-radio/form-radio.component';
import {BossyDropdownComponent} from '../../bossy-ui/components/dropdown/dropdown.component';
import {BossyDropdownMenuItemComponent} from '../../bossy-ui/components/dropdown-menu/dropdown-menu.component';
import {BossyFormElementComponent} from '../../bossy-ui/components/form-element/form-element.component';
import {BossyFormSelectMenuComponent} from '../../bossy-ui/components/form-selectmenu/form-selectmenu.component';
import {BossyFormTextareaComponent} from '../../bossy-ui/components/form-textarea/form-textarea.component';

@Component({
  selector: 'app-dynamic-component',
  // Reference to the components must be here in order to dynamically create them
  entryComponents: [BossyCalendarComponent,
    BossyFormComponent,
    BossyAlertComponent,
    BossyModalComponent,
    BossyFormElementComponent,
    BossyFormRadioComponent,
    BossyDropdownComponent,
    BossyDropdownMenuItemComponent,
    BossyFormSelectMenuComponent,
    BossyFormTextareaComponent],
  template: `
    <div #dynamicComponentContainer></div>`,
})
export class DynamicComponent {
  currentComponent = null;

  @ViewChild('dynamicComponentContainer', {read: ViewContainerRef}) dynamicComponentContainer: ViewContainerRef;

  @Input()
  set componentData(data: { component: any, config: any }) {
    if (!data) {
      return;
    }
    const injector = ReflectiveInjector.fromResolvedProviders([], this.dynamicComponentContainer.parentInjector);
    const factory = this.resolver.resolveComponentFactory(data.component);
    const component = factory.create(injector);

    component.instance['config'] = data.config;

    this.dynamicComponentContainer.insert(component.hostView);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }

  constructor(private resolver: ComponentFactoryResolver) {
  }
}
