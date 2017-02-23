import {Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';
import {BossyCalendar} from '../../dist/components/calendar';
import {BossyForm} from '../../dist/components/form';
import {BossyFormInput} from '../../dist/components/form-input';
<<<<<<< HEAD
import {MyronExampleComponent} from '../../dist/components/myron-component';
=======
import {LukeShortExampleComponent} from '../../dist/components/luke-short-name-example';
>>>>>>> e4a80178db23fd749da9744d8a3f4f2e19cf7273


@Component({
	selector: 'dynamic-component',
<<<<<<< HEAD
	entryComponents: [BossyCalendar, BossyForm, BossyFormInput, MyronExampleComponent], // Reference to the components must be here in order to dynamically create them
=======
	entryComponents: [BossyCalendar, BossyForm, BossyFormInput, LukeShortExampleComponent], // Reference to the components must be here in order to dynamically create them
>>>>>>> e4a80178db23fd749da9744d8a3f4f2e19cf7273
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
