interface CollapseItems {
    name: string;
    data: string;
    state?: string;
    className?: string;
}

export class BossyCollapseConfig {
    constructor(public items: Array<CollapseItems>,
        public isAccordionStyle?: boolean) {
    }
}
