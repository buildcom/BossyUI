import { BossyFormConfig } from '../src/components/BossyForm';


let cfg: BossyFormConfig;
describe('The Config Component', () => {
	beforeEach(() => {
		cfg = new BossyFormConfig();
	});
	it('Should instantiate.', () =>{
		expect(cfg).toBeTruthy();
	});
});
