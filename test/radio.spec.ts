/*

// Following example from other BossyUI tests

import {BossyRadio} from '../src/components/radio';

let radio: BossyRadio;

fdescribe('Radio component', () => {
	beforeEach(() => {
		radio = new BossyRadio();
		radio.config = {items: []}
		radio.ngOnInit();
	});
	it('sanity check', () => {
		expect(true).toEqual(false);
	});
});

*/

// Following example from angular.io testing docs

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {BossyRadio} from '../src/components/radio';
import {BossyRadioConfig} from '../src/config/radio';

fdescribe('Radio Component', () => {
	let radio: BossyRadio;
	let bossyRadioConfig: BossyRadioConfig;
	let bossyRadioConfigStub: BossyRadioConfig;
	let fixture: ComponentFixture<BossyRadio>;
	let de: DebugElement;
	let el: HTMLElement;
	beforeEach(async(() => {
		bossyRadioConfigStub = {
			items: ['bananas'],
			isInline: false
		};
		TestBed.configureTestingModule({
			declarations: [BossyRadio],
			providers: [{provide: BossyRadioConfig, useValue: bossyRadioConfigStub}]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BossyRadio);
		radio = fixture.componentInstance;
		bossyRadioConfig = TestBed.get(BossyRadioConfig);
		de = fixture.debugElement.query(By.css('label'));
		el = de.nativeElement;
	});
	it('banana check', () => {
		expect("bananas").toEqual("bananas");
	});
});
