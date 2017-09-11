import {Component, Input} from '@angular/core';
import {BossyFormSelectMenuConfig} from '../config/form-selectmenu';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-form-selectmenu',
	templateUrl: '../templates/form-selectmenu.html',
})

export class BossyFormSelectMenu {
	@Input() config: BossyFormSelectMenuConfig;
	constructor() {}
}
