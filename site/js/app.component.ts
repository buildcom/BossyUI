import { Component } from '@angular/core';

declare var System: any;
declare var Components: Array<Component>;

// interface Component {
//     fullName: string,
//     shortName: string,
//     path: string
// }

@Component({
    selector: 'sandbox-app',
    template: `
        <div class="row">
            <div class="col-fixed-200">
                <ul class="left-menu">
                    <li class="left-menu-item" *ngFor="let component of components">{{component.shortName}}</li>
                </ul>
            </div>
            <div class="col-offset-200">
                <div class="row">
                    <bossy-calendar [config]="config"></bossy-calendar>
                </div>
            </div>
        </div>
    `
})
export class AppComponent {
    config: any = {};
    components: Array<Component>;

    constructor() {
        this.components = Components;

        // console.log('components', this.components);
        // this.loadComponents();
    }

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


