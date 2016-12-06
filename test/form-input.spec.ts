//form-input
import {BossyFormInput} from '../src/components/form-input';
import {BossyFormInputConfig} from '../src/config/form-input';

let cfgT: BossyFormInputConfig;

describe("The form-input component", ()=>{
	beforeEach(()=>{
		cfgT = new BossyFormInputConfig("name", "text", "text", "text", false, "text");
	});
	it("should instantiate.", ()=>{
		expect(cfgT).toBeTruthy();
	}),
	it("should have a type of text", ()=> {
		expect(cfgT.type).toEqual("text");
	});
});
