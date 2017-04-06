import {BossyInputConfig} from '../config/input';

export class BossyFormConfig {
	constructor(
		public elements: Array<BossyInputConfig>,
		public isFormInlined?: boolean
		) {}
}
