import {
  Component,
  Input,
  ViewContainerRef,
  ViewChild,
  ReflectiveInjector,
  ComponentFactoryResolver
} from '@angular/core';
import {BossyCalendarComponent} from '../../bossy-ui/components/calendar/calendar';
import {BossyFormComponent} from '../../bossy-ui/components/form/form';
import {BossyFormRadioComponent} from '../../bossy-ui/components/form-radio/form-radio';
import {BossyDropdownComponent} from '../../bossy-ui/components/dropdown/dropdown';
import {BossyDropdownMenuItemComponent} from '../../bossy-ui/components/dropdown-menu/dropdown-menu';
import {BossyFormElementComponent} from '../../bossy-ui/components/form-element/form-element';
import {BossyFormSelectMenuComponent} from '../../bossy-ui/components/form-selectmenu/form-selectmenu';
import {BossyFormTextareaComponent} from '../../bossy-ui/components/form-textarea/form-textarea';

@Component({
  selector: 'app-dynamic-component',
  // Reference to the components must be here in order to dynamically create them
  entryComponents: [BossyCalendarComponent,
    BossyFormComponent,
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
