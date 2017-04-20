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
	labelId: string = '';
	isInline: boolean = false;
	isDisabled: Array<boolean> = [];

	constructor() {
	}

	ngOnInit() {

		this.config.items.forEach((element) => {
			this.items.push(element);
		});

		if (this.config.labelId != null) {
			this.labelId = this.config.labelId;
		}

		if (this.config.isInline != null) {
			this.isInline = this.config.isInline;
		}

		if (typeof this.config.isDisabled === 'undefined') {
			return;
		}
		if (this.config.isDisabled.length > this.config.items.length) {
			return;
		}
		this.config.isDisabled.forEach((element) => {
			this.isDisabled.push(element);
		});
	}

}
