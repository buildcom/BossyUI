import {bootstrap} from 'angular2/platform/browser';
import {Component, DynamicComponentLoader, ElementRef} from 'angular2/core';
//import {BossyCalendar} from 'bossyui/dist/bossy';

declare var System: any;
declare var Components: Array<Component>;

interface Component {
    fullName: string,
    shortName: string,
    path: string
}

@Component({
    selector: 'sandbox-app',
    template: `
        <div class="row">
            <div class="col-fixed-200">
                <ul class="left-menu">
                    <li class="left-menu-item" *ngFor="#c of components">{{c.shortName}}</li>
                </ul>
            </div>
            <div class="col-offset-200">
                <div class="row">
                    <div #content></div>
                    <!--<bossy-calendar [config]="config"></bossy-calendar>-->
                </div>
            </div>
        </div>
    `,
 //   directives: [BossyCalendar]
})
class AppComponent {
    config: any;
    components: Array<Component>;

    constructor(
        private dynamicComponentLoader: DynamicComponentLoader,
        private elementRef: ElementRef
    ) {
        this.components = Components;
        this.loadComponents();
    }

    loadComponents() {

        this.config = {foo: 'bar'};

        this.components.forEach(component => {
            System.import(component.path)
                .then(componentModule => {
                    this.dynamicComponentLoader.loadIntoLocation(componentModule[component.fullName], this.elementRef, 'content')
                        .then(component => {
                            //component.instance.inputProperty = this.config.Calendar;
                            //component.instance.inputValue = this.config.Calendar;
                            component.instance.config = this.config;
                        });
                });
        });
    }
}

bootstrap(AppComponent);

