import { Component, Input, OnChanges } from '@angular/core';
import {BossyFormInputConfig} from '../config/BossyFormInput';

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-form-input',
    templateUrl: '../templates/form-input.html',
    styleUrls: ['../styles/form-input.css'],
})
export class BossyFormInput {
	@Input() config = new BossyFormInputConfig("text");
    constructor(){																																										
       if(this.config.type === "text")
       {
			this.output();
       }
    }
    ngOnInit() {
       
    }
    output()
    {
    }
};
