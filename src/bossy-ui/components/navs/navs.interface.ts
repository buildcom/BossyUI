export interface navItem {
    name: string;
    active: navsActive;
}

export enum navsActive {
    active = 'active',
    disabled = 'disabled',
    none = 'none'
}
