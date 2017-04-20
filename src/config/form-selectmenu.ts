export interface MenuItem {
	value: string;
	isDisabled?: boolean;
}

export interface BossyFormSelectMenuInterface {
	title: string;
	items: [MenuItem];
}

export class BossyFormSelectMenuConfig {
		public title: string;
		public items: [MenuItem];
		constructor(options: BossyFormSelectMenuInterface) {
			Object.assign(this, options);
		}
}
