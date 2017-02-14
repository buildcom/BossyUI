import { BossyFormConfig } from '../src/config/form';

let cfg: BossyFormConfig;

describe('The Config Component', () => {
	beforeEach(() => {
		cfg = new BossyFormConfig([]);
	});
	it('Should instantiate.', () =>{
		expect(cfg).toBeTruthy();
	});
});
