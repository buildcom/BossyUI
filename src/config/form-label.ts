export class BossyFormLabelConfig {
	constructor(
		public text?: string,
		public inline?: boolean,

		public cssClass?: string,
		public badgetext?: string,
		public badgetype?: string,

		public hasSuccess?: boolean,
		public hasWarning?: boolean,
		public hasDanger?: boolean
	) {}
}
