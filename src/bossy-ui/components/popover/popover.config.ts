
export class BossyPopoverConfig {
  public hide: boolean;
  constructor(
              public name: string,
              public popoverID: string,
              public dismissable: boolean,
              public placement: string,
              public popoverTitle: string,
              public popoverData: string) {
  }
}
