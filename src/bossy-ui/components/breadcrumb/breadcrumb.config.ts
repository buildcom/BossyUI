interface BreadcrumbItem {
    name: string;
    href: string;
    state?: string;
    isActive?: boolean;
}

export class BossyBreadcrumbConfig {
    constructor(public items: Array<BreadcrumbItem>) {
    }
}
