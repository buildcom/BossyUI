import { Component } from '@angular/core';

declare const Components: Array<any>;
declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'sandbox-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    config: any = {};
    components: Array<any> = Components;

    loadComponents() {

        // this.config = {foo: 'bar'};
        //
        // this.components.forEach(component => {
        //     System.import(component.path)
        //         .then(componentModule => {
        //             this.dynamicComponentLoader.loadIntoLocation(componentModule[component.fullName], this.elementRef, 'content')
        //                 .then(component => {
        //                     //component.instance.inputProperty = this.config.Calendar;
        //                     //component.instance.inputValue = this.config.Calendar;
        //                     component.instance.config = this.config;
        //                 });
        //         });
        // });
    }
}


