import {BossyDropdownMenuConfig} from '../dropdown-menu/dropdown-menu.config';

export class BossyDropdownConfig {
  constructor(public name: string,
              public btnType: string,
              public items: Array<BossyDropdownMenuConfig>,
              public direction: string,
              public btnSize: string,
              public split: boolean) {
  }
}
