import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'sandbox-config',
    templateUrl: '../templates/config.component.html'
})
export class ConfigComponent {
    @Input() config: any;
    configKeys: Array<string>;
    configForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.configChange = this.configChange.bind(this);
    }

    ngOnInit() {
        this.configKeys = Object.keys(this.config);
        this.configForm = this.formBuilder.group(this.config);

        this.configForm.valueChanges.subscribe(this.configChange);
    }

    configChange(newConfig) {
        Object.keys(newConfig).forEach((key) => {
            if (this.config[key] !== newConfig[key]) {
                this.config[key] = newConfig[key];
            }
        });
    }
}


