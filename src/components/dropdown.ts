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
	isSplit: boolean = false;
	isDropup: boolean = false;
	isRightAligned: boolean = false;
	variant: string = 'secondary';
	size: string = undefined;

	showMenuOnClick(event) {
		const element = event.target.parentElement;
		// Checks for 'show' so that we can add btn-group/dropup later
		if (!element.classList.contains('show')) {
			element.classList.add('show');
			event.target.setAttribute('aria-expanded', 'true');
		} else {
			element.classList.remove('show');
			event.target.setAttribute('aria-expanded', 'false');
		}
	}

	ngOnInit() {
		if (this.config.variant !== undefined) {
			this.variant = this.config.variant;
		}
		if (this.config.size === 'large') {
			this.size = 'btn-lg';
		}
		else if (this.config.size === 'small') {
			this.size = 'btn-sm';
		}

		if (this.config.isRightAligned !== undefined) {
			this.isRightAligned = this.config.isRightAligned;
		}
	}
}
