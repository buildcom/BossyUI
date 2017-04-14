export interface MenuItem {
	value: string;
	isDisabled?: boolean;
}

export class BossyFormSelectMenuConfig {
	constructor(
		public initialValue: string,
		public items: [MenuItem],
		) {}
}
