import {BossyDropdownMenuConfig} from '../dropdown-menu/dropdown-menu.config';

export class BossyDropdownConfig {
  constructor(public name: string,
              public btn_type: string,
              public items: Array<BossyDropdownMenuConfig>,
              public direction: string,
              public btn_size: string,
              public split: boolean) {
  }
}
