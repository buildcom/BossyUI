import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyDropdownConfig} from './dropdown.config';

@Component({
  selector: 'bossy-dropdown',
  templateUrl: './dropdown.html',
})

export class BossyDropdownComponent implements OnInit {
  @Input() config: BossyDropdownConfig;
  showMenu = false;
  ariaExpanded = false;
  btnSize: string = undefined;
  btnDir: string = undefined;
  btnShow: string = undefined;

  showMenuOnClick() {
    this.showMenu = !this.showMenu;
    this.ariaExpanded = !this.ariaExpanded;

    if (this.showMenu === true) {
      this.btnShow = 'show';
    } else {
      this.btnShow = undefined;
    }
  }

  ngOnInit() {
    if ( this.config.btnSize === 'small' ) {
      this.btnSize = 'btn-sm';
    } else if ( this.config.btnSize === 'large' ) {
      this.btnSize = 'btn-lg';
    } else {
      this.btnSize = '';
    }

    if ( this.config.direction === 'up') {
      this.btnDir = 'dropup';
    } else if ( this.config.direction === 'down' ) {
      this.btnDir = 'dropdown';
    } else if ( this.config.direction === 'left' ) {
      this.btnDir = 'dropleft';
    } else if ( this.config.direction === 'right' ) {
      this.btnDir = 'dropright';
    } else {
      this.btnDir = 'dropdown';
    }

  }
}
