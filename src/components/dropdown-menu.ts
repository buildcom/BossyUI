import {Component, Input} from '@angular/core';
import {BossyDropdownMenuItemConfig} from '../config/dropdown-menu';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-dropdown-menu',
	templateUrl: '../templates/dropdown-menu.html',
})

export class BossyDropdownMenuItem {
	@Input() config: BossyDropdownMenuItemConfig;
	type: string = 'Button';
	name: string = 'missingName';
	href: string = '#';
	disabled: boolean = false;
}
