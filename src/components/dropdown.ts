import {Component, Input, SimpleChanges} from '@angular/core';
import {BossyDropdownConfig} from '../config/dropdown';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-dropdown',
	templateUrl: '../templates/dropdown.html',
})

export class BossyDropdown {
	@Input() config: BossyDropdownConfig;
	type: string = 'Button';
	split: boolean = false;
	dropup: boolean = false;
	rightAlignedMenu: boolean = false;
}
