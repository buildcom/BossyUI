import {navItem} from './navs.interface';

export class BossyNavsConfig {
    constructor(public navItems : Array<navItem>,
                public isJustified: boolean,
                public alignment: navsAlignment,
                public type: navsType) {
    }
}
export enum navsAlignment {
    center = 'center',
    right = 'right',
    left = 'left',
    vertical = 'vertical'
}
export enum navsType {
    base = 'base',
    pills = 'pills',
    tabs = 'tabs'
}
