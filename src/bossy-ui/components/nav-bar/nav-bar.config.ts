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
                public isCollapseable: boolean,
                public alignment: navBarAlignment,
                public style: navBarStyle,
                public color: navBarColor) {
    }
}
export enum navBarAlignment {
    default = 'default',
    top = 'top',
    bottom = 'bottom',
    sticky = 'sticky'
}
export enum navBarStyle {
    dark = 'dark',
    light = 'light'
}
export enum navBarColor {
    primary= 'primary',
    secondary= 'secondary',
    success= 'success',
    danger= 'danger',
    warning= 'warning',
    info= 'info',
    light= 'light',
    dark= 'dark'
}
