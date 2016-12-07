import {Component} from '@angular/core';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form-label',
	templateUrl: '../templates/form-label.html',
	styleUrls: ['../styles/form-label.css'],
	inputs: [
		'config'
	]
})
export class BossyFormLabel {
	// code here

}
