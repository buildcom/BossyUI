import {BossyDropdownMenuConfig} from '../dropdown-menu/dropdown-menu.config';

export class BossyDropdownConfig {
  constructor(public name: string,
              public items: Array<BossyDropdownMenuConfig>) {
  }
}
