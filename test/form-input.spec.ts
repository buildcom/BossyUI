import {BossyFormInput} from '../src/components/form-input';

let inp: BossyFormInput;
let formInput = new BossyFormInput();

describe('the form input component', () => {
	fit('should set default hasSuccess to false', () => {
		expect(formInput.hasSuccess).toEqual(false);
	});
});

describe('the form input component', () => {
	fit('should set default hasWarning to false', () => {
		expect(formInput.hasWarning).toEqual(false);
	});
});

describe('the form input component', () => {
	fit('should set default hasDanger to false', () => {
		expect(formInput.hasDanger).toEqual(false);
	});
});
