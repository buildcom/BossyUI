import { Component } from '@angular/core';
import {BossyCalendarConfig} from "../../dist/config/calendar";
import {BossyFormInputConfig} from "../../dist/components/form-input";

declare const Components: Array<any>;
declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'sandbox-app',
    templateUrl: '../templates/app.component.html',
    outputs: ['calendarConfig','formInputConfig']
})
export class AppComponent {
    components: Array<any> = Components;

    calendarConfig: BossyCalendarConfig;
	formInputConfig : BossyFormInputConfig;
	
    ngOnInit() {
        this.calendarConfig = new BossyCalendarConfig();
        this.formInputConfig = new BossyFormInputConfig();
    }
}


