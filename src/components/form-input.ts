import { Component, Input, OnChanges } from '@angular/core';
import {BossyFormInputConfig} from '../config/BossyFormInput';

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-form-input',
    templateUrl: '../templates/form-input.html',
    styleUrls: ['../styles/form-input.css'],
    inputs: ['config'],
})
export class BossyFormInput {
	public config: any;
	@Input() options = new BossyFormInputConfig("text");
    constructor(){
       if(this.options.type === "text")
       {
			this.output();
       }
        console.log('option-type: ' + this.options.type);
    }
    ngOnInit() {
      console.log('ngOnInit: option-type: ' + this.options.type); 
    }
    output()
    {
		console.log("Component in BossyFormInput is outputting.");
    }
};
