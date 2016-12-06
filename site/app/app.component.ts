import { Component } from '@angular/core';
import {BossyCalendarConfig} from "../../dist/config/calendar";
import {BossyFormInputConfig} from "../../dist/config/BossyFormInput";

declare const Components: Array<any>;
declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'sandbox-app',
    templateUrl: '../templates/app.component.html',
    outputs: ['calendarConfig','formInputConfig']
})
export class AppComponent {

    calendarConfig: BossyCalendarConfig;
	formConfig: Array<BossyFormInputConfig>;
	
    ngOnInit() {
        this.calendarConfig = new BossyCalendarConfig();

        this.formConfig = [
            new BossyFormInputConfig("text"),
            new BossyFormInputConfig("text"),
            new BossyFormInputConfig("text"),
            new BossyFormInputConfig("text"),
            new BossyFormInputConfig("text")
        ];
    }
}
