import { Component } from '@angular/core';
import {BossyCalendarConfig} from "../../dist/components/calendar";


declare const Components: Array<any>;
declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'sandbox-app',
    templateUrl: '../templates/app.component.html',
    outputs: ['calendarConfig']
})
export class AppComponent {
    components: Array<any> = Components;

    calendarConfig: any = {
        label: 'this is a test label'
    };

    ngOnInit() {

        //this.calendarConfig = new BossyCalendarConfig();



        console.log('ng2!', this.calendarConfig.label);

        // Object.keys(BossyCalendarConfig);

    }
}


