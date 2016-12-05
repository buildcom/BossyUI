import { Component, Input, OnChanges } from '@angular/core';
import {BossyFormInputConfig} from '../config/form-input';

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-form-input',
    templateUrl: '../templates/form-input.html',
    styleUrls: ['../styles/form-input.css'],
})
export class BossyFormInput {
	@Input('config') config: any;
    constructor() {
    }
    ngOnInit() {
    }
    output() {
    }
};
