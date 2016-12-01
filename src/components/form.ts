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

class BossyFormConfig {
    elements: any;
    //validators: any;
    //more stuff
}

export class BossyForm {
    configKeys: Array<string>;
    bossyForm: FormGroup;
    @Input() config: BossyFormConfig;

    constructor(private formBuilder: FormBuilder) {
        this.configChange = this.configChange.bind(this);
    }

    ngOnInit() {

        this.configKeys = Object.keys(this.config.elements);

        //create form control group
        this.bossyForm = this.formBuilder.group(this.config.elements);
        //todo: add validators

        this.bossyForm.valueChanges.subscribe(this.configChange);
    }

    configChange(newConfig) {
        Object.keys(newConfig).forEach((key) => {
            if (this.config.elements[key] !== newConfig[key]) {
                this.config.elements[key] = newConfig[key];
            }
        })
    }

    /*
     onSubmit() {
     //TODO: return form data
     }
     */
}



/*
class inputElement{
    type: string;
    inputConfig: any;
}

config example

var config = {

    //some things

    elements: {
        numberInputOne: {
            type: number,
            inputConfig: {}
        },

        textInputOne: {
            type: text,
            inputConfig: {}
        },

        textAreaInputOne: {
            type: textarea,
            inputConfig: {}
        },

        numberInputTwo: {
            type: number,
            inputConfig: {}
        }
    }
}

 */