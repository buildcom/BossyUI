// Following example from other BossyUI tests

import {BossyRadio} from '../src/components/radio';

let radio: BossyRadio;

describe('Radio component', () => {
	beforeEach(() => {
		radio = new BossyRadio();
		radio.ngOnInit();
	});
	it('banana check', () => {
		expect("bananas").toEqual("bananas");
	});
});

/*

// Following example from angular.io testing docs

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {BossyRadio} from '../src/components/radio';

fdescribe('Radio Component', () => {
	let radio: BossyRadio;
	let fixture: ComponentFixture<BossyRadio>;
	let de: DebugElement;
	let el: HTMLElement;
	beforeEach(async(() => {
  	TestBed.configureTestingModule({
    declarations: [BossyRadio],
  	})
  	.compileComponents();
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(BossyRadio);
		radio = fixture.componentInstance;
		de = fixture.debugElement.query(By.css('div'));
		el = de.nativeElement;
	});
	it('banana check', () => {
		expect("bananas").toEqual("bananas");
	});
});

*/
