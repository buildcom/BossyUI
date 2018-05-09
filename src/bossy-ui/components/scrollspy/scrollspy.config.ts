export interface ScrollspyItem {
    id: string;
}
export class BossyScrollspyConfig {
    constructor(public scrollspyItems: Array<ScrollspyItem>,
                public type: scrollspyType) {
    }
}
export enum scrollspyType {
    navBar = 'navBar',
    navss = 'navs'
}
