// Define object for each radio element
export class RadioElement {
	public value: string;
	public isDisabled?: boolean;
}

// Interface allows selective use of optional radio parameters
export interface BossyFormRadioInterface {
	items:    Array<RadioElement>;
	componentId:  string;
	title?:    string;
	isInline?: boolean;
}

// Config for radio component
export class BossyFormRadioConfig {
		public items: Array<RadioElement>;
		public componentId: string;
		public title?: string;
		public isInline?: boolean;

	constructor(options: BossyFormRadioInterface) {
		Object.assign(this, options);
	}
}
