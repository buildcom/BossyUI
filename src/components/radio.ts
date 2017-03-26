import {Component, Input, SimpleChanges} from '@angular/core';
import {BossyRadioConfig} from '../config/radio';
import {BossyFormConfig} from '../config/form';


@Component({
	selector: 'bossy-radio',
	template: `

	<div *ngFor="let element of radioItemsFromConfig; let i = index" [ngClass]="{'form-check': true, ' form-check-inline': isRadioInlinedFromConfig}">
	  <label class="form-check-label">
	    <input class="form-check-input" type="radio" name="radioOptions" id="radioElement{{i}}" value="option{{i}}">  {{element}}
	  </label>
	</div>
	`
// templateUrl: '../templates/radio.html',
})
export class BossyRadio {
	@Input() config: BossyRadioConfig;
	radioItemsFromConfig: Array<string> = [];
	isRadioInlinedFromConfig: boolean = false;

	constructor() {
	}

	ngOnInit() {
		this.config.radioItems.forEach((element) => {
			this.radioItemsFromConfig.push(element);
		});

		this.isRadioInlinedFromConfig = this.config.isRadioInlined;
	}
}
