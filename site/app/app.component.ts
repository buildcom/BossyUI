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

    calendarConfig: BossyCalendarConfig;

    ngOnInit() {
        this.calendarConfig = new BossyCalendarConfig();

    }
}


