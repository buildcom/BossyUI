import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


// Don't merge this file.  It is a placeholder for testing purposes.

declare const module: any;

export interface BossyFormConfig {
	numFields: number,
}


@Component({
	moduleId: module.id,
    selector: 'bossy-form',
    inputs: ['config'],
})

export class BossyFormConfig implements OnInit
{
	ngOnInit() {
	  this.numFields = 0;
	
	}
}
