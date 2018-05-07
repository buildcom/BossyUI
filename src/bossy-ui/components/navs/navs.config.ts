export interface NavItem {
    name: string;
    active: navsActive;
}
export enum navsActive {
    active = 'active',
    disabled = 'disabled',
    none = 'none'
}
export class BossyNavsConfig {
    constructor(public navItems: Array<NavItem>,
                public hasContent: boolean,
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
