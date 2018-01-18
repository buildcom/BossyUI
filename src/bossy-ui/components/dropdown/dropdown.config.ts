import {BossyDropdownMenuConfig} from '../dropdown-menu/dropdown-menu.config';

export class BossyDropdownConfig {
  constructor(public name: string,
              public type: string,
              public items: Array<BossyDropdownMenuConfig>,
              public isSplit?: boolean,
              public size?: string,
              public isDropup?: boolean,
              public isRightAligned?: boolean,
              public variant?: string) {
  }
}
