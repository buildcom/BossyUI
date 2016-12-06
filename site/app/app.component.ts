import { Component } from '@angular/core';
import {BossyCalendarConfig} from "../../dist/config/calendar";
import {BossyFormConfig} from "../../dist/config/form";
import {BossyFormInputConfig} from "../../dist/config/form-input";

declare const Components: Array<BossyFormInputConfig>;
declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'sandbox-app',
    templateUrl: '../templates/app.component.html',
    outputs: ['calendarConfig','formConfig']
})
export class AppComponent {
    components: Array<BossyFormInputConfig> = Components;
    calendarConfig: BossyCalendarConfig;
	formConfig: BossyFormConfig;
	
    ngOnInit() {
        this.calendarConfig = new BossyCalendarConfig();
        this.formConfig = new BossyFormConfig(this.components);
    }
}
