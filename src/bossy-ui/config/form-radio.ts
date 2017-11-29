// Define object for each radio element
export class RadioElement {
  public value: string;
  public isDisabled?: boolean;
}

// Interface allows selective use of optional radio parameters
export interface BossyFormRadioInterface {
  items: Array<RadioElement>;
  componentId: string;
  isInline?: boolean;
  validators?: Array<any>;

}

// Config for radio component
export class BossyFormRadioConfig {
  public items: Array<RadioElement>;
  public componentId: string;
  public isInline?: boolean;
  public validators?: Array<any>;

  constructor(options: BossyFormRadioInterface) {
    Object.assign(this, options);
  }
}
