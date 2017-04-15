import {Component, Input, SimpleChanges} from '@angular/core';
import {BossyFormRadioConfig} from '../config/form-radio';
import {BossyFormConfig} from '../config/form';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form-radio',
	templateUrl: '../templates/form-radio.html'
})
export class BossyFormRadio {
	@Input() config: BossyFormRadioConfig;
	items: Array<string> = [];
	isInline: boolean = false;
	labelId: string = '';

	constructor() {
	}

	ngOnInit() {

		this.config.items.forEach((element) => {
			this.items.push(element);
		});

		if (this.config.isInline != null) {
			this.isInline = this.config.isInline;
		}

		this.labelId = this.config.labelId;
	}
}
