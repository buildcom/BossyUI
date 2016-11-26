import { Component } from '@angular/core';

declare const module: any;
export class BossyFormInputConfig{
    type: string;
    id: string;
    required: boolean;
    label: string;


    constructor(type: string) {
        this.type = type;
        this.id = '';
        this.required = false;
        this.label = '';
    }
}

@Component({
    moduleId: module.id,
    selector: 'bossy-form-input',
    templateUrl: '../templates/form-input.html',
    styleUrls: ['../styles/form-input.css'],
    inputs: [
        'config'
    ]
})
export class BossyFormInput {
    // code here
    
}
