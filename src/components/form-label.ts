import {Component, Input} from '@angular/core';
import {BossyFormLabelConfig} from '../config/form-label';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form-label',
	templateUrl: '../templates/form-label.html',
	styleUrls: ['../styles/form-label.css'],

})
export class BossyFormLabel {
	@Input() config: BossyFormLabelConfig;
	isInline: boolean = false;

}
