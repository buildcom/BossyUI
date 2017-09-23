import {Component, Input} from '@angular/core';
import {BossyDropdownMenuItemConfig} from '../../config/dropdown-menu';

declare const module: any;

@Component({
  moduleId: module.id,
  selector: 'bossy-dropdown-menu',
  templateUrl: './dropdown-menu.html',
})

export class BossyDropdownMenuItemComponent {
  @Input() config: BossyDropdownMenuItemConfig;
  type = 'button';
  name = 'missingName';
  href = '#';
  isDisabled = false;

  checkForDisabled() {
    if (this.config.isDisabled) {
      return 'disabled';
    }
  }
}
