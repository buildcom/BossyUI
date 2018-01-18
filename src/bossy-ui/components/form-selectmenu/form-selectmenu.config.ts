export interface BossyFormSelectMenuItemInterface {
  value: string;
  isDisabled?: boolean;
}

export interface BossyFormSelectMenuInterface {
  title: string;
  items: [BossyFormSelectMenuItemInterface];
}

export class BossyFormSelectMenuConfig {
  public title: string;
  public items: [BossyFormSelectMenuItemInterface];

  constructor(options: BossyFormSelectMenuInterface) {
    Object.keys(options).forEach((key: string) => {
      this[key] = options[key];
    });
  }
}
