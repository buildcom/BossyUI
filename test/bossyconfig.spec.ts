import { BossyFormConfig } from '../config/form';
import { BossyFormInputConfig } from '../config/form-input';


let cfg: BossyFormConfig = new BossyFormConfig([]);

describe('The Config Component', () => {
	beforeEach(() => {
		cfg = new BossyFormConfig([]);
	});
	it('Should instantiate.', () =>{
		expect(cfg).toBeTruthy();
	});
});
