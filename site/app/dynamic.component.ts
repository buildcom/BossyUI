import {Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';
import {BossyCalendar} from '../../sandbox/components/calendar';
import {BossyForm} from '../../sandbox/components/form';
import {BossyRadio} from '../../sandbox/components/radio';
import {BossyDropdown} from '../../sandbox/components/dropdown';
import {BossyDropdownMenuItem} from '../../sandbox/components/dropdown-menu';
import {BossyFormInput} from '../../sandbox/components/form-input';
import {BossyFormSelectMenu} from '../../sandbox/components/form-selectmenu';
import {BossyFormTextarea} from '../../sandbox/components/bossy-form-textarea';

@Component({
	selector: 'dynamic-component',
	entryComponents: [BossyCalendar, BossyForm, BossyFormInput, BossyRadio, BossyDropdown, BossyDropdownMenuItem, BossyFormSelectMenu, BossyFormTextarea], // Reference to the components must be here in order to dynamically create them
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
