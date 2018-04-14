export class BossyModalConfig {
    constructor(public buttonName: string,
                public title: string,
                public body: string,
                public button1: string,
                public button2: string,
                public isCentered: boolean,
                public size: modalSize) {
    }
  }
  export enum modalSize {
    large= 'large',
    medium= 'medium',
    small= 'small'
}
