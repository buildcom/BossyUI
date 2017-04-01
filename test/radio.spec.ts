import {BossyRadio} from '..src/components/radio';
let radio: BossyRadio;
fdescribe('the radio component', () => {
	beforeEach(() => {
		radio = new BossyRadio();
		radio.ngOnInit();
	});
	it('sanity check', () => {
		expect(true).toEqual(false);
	});
});
