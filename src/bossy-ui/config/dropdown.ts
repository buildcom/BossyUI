import {BossyDropdownMenuItemConfig} from './dropdown-menu';

export class BossyDropdownConfig {
  constructor(public name: string,
              public type: string,
              public items: Array<BossyDropdownMenuItemConfig>,
              public isSplit?: boolean,
              public size?: string,
              public isDropup?: boolean,
              public isRightAligned?: boolean,
              public variant?: string) {
  }
}
