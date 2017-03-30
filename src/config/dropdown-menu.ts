export class BossyDropdownMenuItemConfig {
	constructor(
		public type: string, // Use class instead of type for name?
		public name?: string,
		public href?: string,
		public disabled?: boolean,
		) {}
}
