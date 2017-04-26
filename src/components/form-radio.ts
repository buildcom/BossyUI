import {Component, Input, SimpleChanges} from '@angular/core';
import {BossyFormRadioConfig} from '../config/form-radio';
import {RadioElement} from '../config/form-radio';
import {BossyFormConfig} from '../config/form';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form-radio',
	templateUrl: '../templates/form-radio.html'
})
export class BossyFormRadio {
	@Input() config: BossyFormRadioConfig;
	items: Array<RadioElement> = [];
	componentId: string = '';
	title: string = '';
	isInline: boolean = false;

	constructor() {
	}

	ngOnInit() {
		this.config.items.forEach((element) => {
			this.items.push(element);
		});

		this.componentId = this.config.componentId;

		this.title = this.config.title;

		if (this.config.isInline !== undefined) {
			this.isInline = this.config.isInline;
		}
	}
}
