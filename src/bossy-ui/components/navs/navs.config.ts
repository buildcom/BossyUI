export class BossyNavsConfig {
    constructor(public nav1: string,
                public nav2: string,
                public nav3: string,
                public nav4: string,
                public isJustified: boolean,
                public alignment: navsAlignment,
                public type: navsType) {
    }
  }
  export enum navsAlignment {
    center= 'center',
    right= 'right',
    left= 'left',
    vertical= 'vertical'
}
export enum navsType {
    base= 'base',
    pills= 'pills',
    tabs= 'tabs'
}
