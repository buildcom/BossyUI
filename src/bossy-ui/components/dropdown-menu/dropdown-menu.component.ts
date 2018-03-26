import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyDropdownMenuConfig} from './dropdown-menu.config';

@Component({
  selector: 'bossy-dropdown-menu',
  templateUrl: './dropdown-menu.html',
})

export class BossyDropdownMenuItemComponent {
  @Input() config: BossyDropdownMenuConfig;
}
