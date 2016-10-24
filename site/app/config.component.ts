import { Component } from '@angular/core';

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'sandbox-config',
    templateUrl: '../templates/config.component.html',
    inputs: ['sandboxConfig']
})
export class ConfigComponent {
    sandboxConfig;


    ngOnInit() {
        console.log('config', this.sandboxConfig);
        //Object.keys(this.calendarConfig)

    }
}


