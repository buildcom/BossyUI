describe('BossyRadio component', () => {
	let comp: BossyRadio;
	beforeEach(() => {
		const BossyRadio = new Radio();
	});
	it('should fail', () => {
		expect(true).toEqual(false);
	});
	it('something', () => {
		fixture.detectChanges();
		expect(el.innerText).toEqual('Logout');
	});
});
