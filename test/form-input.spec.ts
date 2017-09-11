import { async } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import {BossyFormInput} from '../src/components/form-input';
import {BossyFormInputConfig} from '../src/config/form-input';

let inp: BossyFormInput;
let fixture: ComponentFixture<BossyFormInput>;
let de:      DebugElement;
let el:      HTMLElement;
let formInpConfig: BossyFormInputConfig;

const formInput1 = {
	name: 'CrazyInput',
	type: 'WildText',
	value: 'RandomValue',
	label: 'SuperLabel'
};

const formInput2 = {
	name: 'CrazyName',
	type: 'WildType',
	value: 'SomeValue',
	rows: 3,
	columns: 4
};

const formInput3 = {
	name: 'Name3',
	type: 'Type3',
	value: 'Value3'
};

const formInput4 = {
	name: 'Name4',
	type: 'Type4'
};


describe('Unit tests for BossyFormInput Component: ', () => {
	describe('Testbed to check text values of attributes', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [BossyFormInput],
			})
			.compileComponents(); // compile template and css
	}));


		beforeEach(() => {
			fixture = TestBed.createComponent(BossyFormInput);
			inp = fixture.componentInstance;
			formInpConfig = new BossyFormInputConfig(formInput1);
			inp.config = formInpConfig;
			inp.ngOnInit();
			fixture.detectChanges();
		});


		it('should test if formInput1 has correct name', () => {
			expect(formInput1.name).toEqual('CrazyInput');
		});
		it('should test if formInput1 has correct type', () => {
			expect(formInput1.type).toEqual('WildText');
		});
		it('should test if formInput1 has correct value', () => {
			expect(formInput1.value).toEqual('RandomValue');
		});
		it('should test if formInput1 has correct label', () => {
			expect(formInput1.label).toEqual('SuperLabel');
		});



		it('should test if formInput2 has correct name', () => {
			expect(formInput2.name).toEqual('CrazyName');
		});
		it('should test if formInput2 has correct type', () => {
            expect(formInput2.type).toEqual('WildType');
		});
		it('should test if formInput2 has correct value', () => {
			expect(formInput2.value).toEqual('SomeValue');
		})
		it('should test if formInput2 has correct number of rows', () => {
			expect(formInput2.rows).toEqual(3);
		});
		it('should test if formInput2 has correct number of columns', () => {
			expect(formInput2.columns).toEqual(4);
		});



		it('should test if formInput3 has correct name', () => {
			expect(formInput3.name).toEqual('Name3');
		});
		it('should test if formInput3 has correct type', () => {
        	expect(formInput3.type).toEqual('Type3');
        });
		it('should test if formInput3 has correct name', () => {
			expect(formInput3.value).toEqual('Value3');
		});



		it('should test if formInput4 has correct name', () => {
			expect(formInput4.name).toEqual('Name4');
		});
		it('should test if formInput4 has correct type', () => {
			expect(formInput4.type).toEqual('Type4');
		});

	});



describe('the form input component', () => {
	it('should set default hasSuccess to false', () => {
		expect(inp.hasSuccess).toEqual(false);
	});
});

describe('the form input component', () => {
	it('should set default hasWarning to false', () => {
		expect(inp.hasWarning).toEqual(false);
	});
});

describe('the form input component', () => {
	it('should set default hasDanger to false', () => {
		expect(inp.hasDanger).toEqual(false);
	});
});

});
