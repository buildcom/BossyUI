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
  btn_size: string = undefined;
  btn_dir: string = undefined;
  btn_show: string = undefined;

  showMenuOnClick() {
    this.showMenu = !this.showMenu;
    this.ariaExpanded = !this.ariaExpanded;

    if (this.showMenu === true) {
      this.btn_show = 'show';
    } else {
      this.btn_show = undefined;
    }
  }

  ngOnInit() {
    if ( this.config.btn_size === 'small' ) {
      this.btn_size = 'btn-sm';
    } else if ( this.config.btn_size === 'large' ) {
      this.btn_size = 'btn-lg';
    } else {
      this.btn_size = '';
    }

    if ( this.config.direction === 'up') {
      this.btn_dir = 'dropup';
    } else if ( this.config.direction === 'down' ) {
      this.btn_dir = 'dropdown';
    } else if ( this.config.direction === 'left' ) {
      this.btn_dir = 'dropleft';
    } else if ( this.config.direction === 'right' ) {
      this.btn_dir = 'dropright';
    } else {
      this.btn_dir = 'dropdown';
    }

  }
}
