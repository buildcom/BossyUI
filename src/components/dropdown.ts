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

	ddShow(event){
		const ddClass = event.target.parentElement;
		if (ddClass.className === 'dropdown')
		{
			ddClass.className = 'dropdown show';
			event.target.setAttribute('aria-expanded', 'true');
		} else
		{
			ddClass.className = 'dropdown';
			event.target.setAttribute('aria-expanded', 'false');
		}
	}
}
