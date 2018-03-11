
export class BossyPopoverConfig {
  public hide: boolean;
  constructor(
              public name: string,
              public popoverID: string,
              public dismissable: boolean,
              public popoverTitle: string,
              public popoverData: string) {
  }
}
