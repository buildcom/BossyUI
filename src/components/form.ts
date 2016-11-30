import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-form',
    templateUrl: '../templates/form.html',
    styleUrls: ['../styles/form.css'],
    inputs: ['config']
})
export class BossyForm {
    configKeys: Array<string>;
    configForm: FormGroup;
    public config: any;

    constructor(private formBuilder: FormBuilder){
        this.configChange = this.configChange.bind(this);
    }

    ngOnInit() {

        console.log('config-size', this.config.length);  //config array size

        this.configKeys = Object.keys(this.config);

        //create form control group
        this.configForm = this.formBuilder.group(this.config);

        this.configForm.valueChanges.subscribe(this.configChange);
    }

    configChange(newConfig) {
        Object.keys(newConfig).forEach((key) => {
            if (this.config[key] !== newConfig[key]) {
                this.config[key] = newConfig[key];
            }
        })
    }
/*
    onSubmit() {
        //TODO: return form data
    }
*/
}


