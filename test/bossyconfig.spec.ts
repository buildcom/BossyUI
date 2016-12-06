import { BossyFormConfig } from '../src/config/form';
import { BossyFormInputConfig} from '../src/config/form-input';

let cfgI: BossyFormInputConfig;
let cfg: BossyFormConfig;
let elem: Array<BossyFormInputConfig>;
describe('The Config Component', () => {
	beforeEach(() => {
		cfgI = new BossyFormInputConfig("text", "text", "text", "text", false, "text");
		elem = new Array<BossyFormInputConfig>;
		elem[0] = cfgI;
		cfg = new BossyFormConfig(elem);
	});
	it('Should instantiate.', () =>{
		expect(cfg).toBeTruthy();
	});
});
