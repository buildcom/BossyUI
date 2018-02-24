
export class BossyPopoverConfig {
  public hide: boolean;
  public arrowSpacing: number;
  public popoverTop: number;
  public popoverLeft: number;
  constructor(
              public name: string,
              public id: string,
              public popoverTitle: string,
              public popoverData: string) {          
  }
}