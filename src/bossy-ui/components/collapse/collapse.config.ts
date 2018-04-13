interface CollapseItems {
    name: string;
    data: string;
}

export class BossyCollapseConfig {
    constructor(public items: Array<CollapseItems>,
        public isAccordionStyle?: boolean) {
    }
}
