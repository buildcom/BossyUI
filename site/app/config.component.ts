import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'sandbox-config',
    templateUrl: '../templates/config.component.html',
    inputs: ['config']
})
export class ConfigComponent {
    config: any;
    configKeys: Array<string>;
    configForm: FormGroup;
    configFormControls: any = {};

    ngOnInit() {
        this.configKeys = Object.keys(this.config);

        this.configKeys.forEach((key) => {
            this.configFormControls[key] = new FormControl(this.config[key].toString());
        });

        this.configForm = new FormGroup(this.configFormControls);
    }
}


