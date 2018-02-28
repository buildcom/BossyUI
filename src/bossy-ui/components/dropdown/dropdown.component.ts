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

  showMenuOnClick() {
    this.showMenu = !this.showMenu;
    this.ariaExpanded = !this.ariaExpanded;
  }

  ngOnInit() {
  }
}