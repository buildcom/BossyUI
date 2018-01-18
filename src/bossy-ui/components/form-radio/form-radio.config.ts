// Define object for each radio element
export class BossyFormRadioElement {
  public value: string;
  public isDisabled?: boolean;
}

// Interface allows selective use of optional radio parameters
export interface BossyFormRadioInterface {
  items: Array<BossyFormRadioElement>;
  componentId: string;
  isInline?: boolean;
}

// Config for radio component
export class BossyFormRadioConfig {
  public items: Array<BossyFormRadioElement>;
  public componentId: string;
  public isInline?: boolean;

  constructor(options: BossyFormRadioInterface) {
    Object.assign(this, options);
  }
}
