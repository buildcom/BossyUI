export interface NavBarItem {
    name: string;
    active: navBarActive;
}
export enum navBarActive {
    active = 'active',
    disabled = 'disabled',
    none = 'none'
}
export class BossyNavBarConfig {
    constructor(public navBarItems: Array<NavBarItem>,
                public isJustified: boolean,
                public alignment: navBarAlignment,
                public type: navBarType) {
    }
}
export enum navBarAlignment {
    center = 'center',
    right = 'right',
    left = 'left',
    vertical = 'vertical'
}
export enum navBarType {
    base = 'base',
    pills = 'pills',
    tabs = 'tabs'
}
