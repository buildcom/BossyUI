import {Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';
import {BossyCalendar} from '../../dist/components/calendar';
import {BossyForm} from '../../dist/components/form';
import {BossyFormRadio} from '../../dist/components/form-radio';
import {BossyDropdown} from '../../dist/components/dropdown';
import {BossyDropdownMenuItem} from '../../dist/components/dropdown-menu';
import {BossyFormInput} from '../../dist/components/form-input';

@Component({
	selector: 'dynamic-component',
	entryComponents: [BossyCalendar, BossyForm, BossyFormInput, BossyFormRadio, BossyDropdown, BossyDropdownMenuItem], // Reference to the components must be here in order to dynamically create them
	template: `<div #dynamicComponentContainer></div>`,
})
export class DynamicComponent {
	currentComponent = null;

	@ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

	@Input() set componentData(data: {component: any, config: any }) {
		if (!data) {
			return;
		}

		let injector = ReflectiveInjector.fromResolvedProviders([], this.dynamicComponentContainer.parentInjector);
		let factory = this.resolver.resolveComponentFactory(data.component);
		let component = factory.create(injector);

		component.instance['config'] = data.config;

		this.dynamicComponentContainer.insert(component.hostView);

		if (this.currentComponent) {
			this.currentComponent.destroy();
		}

		this.currentComponent = component;
	}

	constructor(private resolver: ComponentFactoryResolver) {}
}
