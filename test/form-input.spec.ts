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


describe('Unit tests for BossyFormInput Component: ', () => {
	describe('Testbed to check textContent of <label>s', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [BossyFormInput],
			})
			.compileComponents(); // compile template and css
	}));


		beforeEach(() => {
			fixture = TestBed.createComponent(BossyFormInput);
			inp = fixture.componentInstance;
			formInpConfig = new BossyFormInputConfig('emailInput');
			inp.config = formInpConfig;
			inp.ngOnInit();
			fixture.detectChanges();
		});

		it('first item of 3', () => {
			de = fixture.debugElement.query(By.css('#Random'));
			el = de.nativeElement;
			expect(el.textContent).toContain('Superman');
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
