import {BossyInputConfig} from '../config/input';

export class BossyFormConfig {
	constructor(
		public elements: Array<BossyFormInputConfig>,
		public isFormInlined?: boolean
		) {}
}
