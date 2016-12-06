import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { BossyFormInputConfig } from '../config/form-input'

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-form',
    templateUrl: '../templates/form.html',
    ///styleUrls: ['../styles/form.css'],
})
export class BossyForm {
    configKeys: Array<string>;
    configForm: FormGroup;
    @Input('config') config: Array<BossyFormInputConfig>;

    constructor(private formBuilder: FormBuilder){
        this.configChange = this.configChange.bind(this);
    }

    ngOnInit() {

        console.log('config-size', this.config.length);  //config array size


        //create form control group
        this.configForm = this.formBuilder.group(this.config);

        this.configKeys = Object.keys(this.configForm.controls);

        this.configKeys.forEach( //TODO GEOFF. WHAT IS GOING ON
            (key) => {
                this.config.id=key;
            }
        )

        console.log(this.configForm);
        console.log(Object.keys(this.configForm.controls));

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


