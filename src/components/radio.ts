import {Component, Input, SimpleChanges} from '@angular/core';
import {BossyRadioConfig} from '../config/radio';
import {BossyFormConfig} from '../config/form';


@Component({
	selector: 'bossy-radio',
	template: `
	<div *ngFor="let element of items; let i = index" [ngClass]="{'form-check': true, ' form-check-inline': isInline}">
	  <label class="form-check-label">
	    <input class="form-check-input" type="radio" name="radioOptions" id="radioElement{{i}}" value="option{{i}}">  {{element}}
	  </label>
	</div>
	`
/*
	browser/something things that '..' is part of the url, rather than following relative path
  templateUrl: '../templates/radio.html'
*/
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

		this.isInline = this.config.isInline;
	}
}
