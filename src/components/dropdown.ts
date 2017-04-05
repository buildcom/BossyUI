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
	color: string = 'secondary';
	size: string = undefined;

	ddShow(event) {
		const ddClass = event.target.parentElement;
		// Checks for 'show' so that we can add btn-group/dropup later
		if (!ddClass.classList.contains('show')) {
			ddClass.classList.add('show');
			event.target.setAttribute('aria-expanded', 'true');
		} else {
			ddClass.classList.remove('show');
			event.target.setAttribute('aria-expanded', 'false');
		}
	}

	ngOnInit() {
		if (this.config.color !== undefined) {
			this.color = this.config.color;
		}
		if (this.config.size === 'large') {
			this.size = 'btn-lg';
		}
		else if (this.config.size === 'small') {
			this.size = 'btn-sm';
		}

		if (this.config.rightAlignedMenu !== undefined) {
			this.rightAlignedMenu = this.config.rightAlignedMenu;
		}
		}
	}
