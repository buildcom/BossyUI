
export class BossyPopoverConfig {
  public hide: boolean;
  constructor(
              public name: string,
              public popoverID: string,
              public isDismissable: boolean,
              public placement: string,
              public popoverTitle: string,
              public popoverData: string) {
  }
}
