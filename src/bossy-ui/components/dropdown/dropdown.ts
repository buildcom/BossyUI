import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyDropdownConfig} from '../../config/dropdown';

declare const module: any;

@Component({
  moduleId: module.id,
  selector: 'bossy-dropdown',
  templateUrl: './dropdown.html',
})

export class BossyDropdownComponent implements OnInit {
  @Input() config: BossyDropdownConfig;
  type = 'Button';
  isSplit = false;
  isDropup = false;
  isRightAligned = false;
  variant = 'secondary';
  size: string = undefined;

  showMenuOnClick(event: any) {
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
    } else if (this.config.size === 'small') {
      this.size = 'btn-sm';
    }

    if (this.config.isRightAligned !== undefined) {
      this.isRightAligned = this.config.isRightAligned;
    }
  }
}
