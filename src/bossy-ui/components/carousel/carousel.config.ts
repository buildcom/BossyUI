export interface CarouselImage {
  title: string;
  active: boolean;
  url: string;
}
export class BossyCarouselConfig {
    constructor(public items: Array<CarouselImage>,
                public indicator: boolean,
                public control: boolean,
                public captions: boolean) {
    }
  }
