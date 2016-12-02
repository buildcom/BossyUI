import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { BossyFormConfig } from '../config/form'

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-form',
    templateUrl: '../templates/form.html',
    styleUrls: ['../styles/form.css']
})

export class BossyForm {
    bossyForm: FormGroup;
    @Input() config: BossyFormConfig;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        //create form control group
        this.bossyForm = this.formBuilder.group(this.config.elements);
        //todo: add validators
    }

     onSubmit() {
     //TODO: return form data
     }

}