import {BossyDropdownMenuItemConfig} from './dropdown-menu';

export class BossyDropdownConfig {
	constructor(
		public name: string,
		public type: string,
		public items: Array<BossyDropdownMenuItemConfig>,
		public split?: boolean,
		public size?: string,
		public dropup?: boolean,
		public rightAligned?: boolean,
		) {}
}
