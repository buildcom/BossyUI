import {Component, Input, SimpleChanges} from '@angular/core';
import {BossyRadioConfig} from '../config/radio';
import {BossyFormConfig} from '../config/form';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-radio',
	templateUrl: '../templates/radio.html'
})
export class BossyRadio {
	@Input() config: BossyRadioConfig;
	items: Array<string> = [];
	isInline: boolean = false;

	constructor() {
	}

	ngOnInit() {
		this.config.items.forEach((element) => {
			this.items.push(element);
		});

		if(this.config.isInline != null) {
		  this.isInline = this.config.isInline;
		}
	}
}
