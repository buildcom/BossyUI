import { async } from '@angular/core/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import {BossyRadio} from '../src/components/radio';
import {BossyRadioConfig} from '../src/config/radio';

let rad:     BossyRadio;
let fixture: ComponentFixture<BossyRadio>;
let de:      DebugElement;
let el:      HTMLElement;
let superConfig: BossyRadioConfig;

describe('Testbed to check textContent of <label>s', () => {
	beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [BossyRadio],
  })
  .compileComponents();//compile template and css
}));
	beforeEach(() => {
		fixture = TestBed.createComponent(BossyRadio);
		rad = fixture.componentInstance;

		superConfig = new BossyRadioConfig(['Star Wars', 'Lord of the Rings', 'Starcraft II'], true);
		rad.config = superConfig;
		rad.ngOnInit();
    fixture.detectChanges();
	});

	it('first item of 3', () => {
		de = fixture.debugElement.query(By.css('#radioLabel0'));
		el = de.nativeElement;
		expect(el.textContent).toContain('Star Wars');
	});
	it('second item of 3', () => {
		de = fixture.debugElement.query(By.css('#radioLabel1'));
		el = de.nativeElement;
		expect(el.textContent).toContain('Lord of the Rings');
	});
	it('third item of 3', () => {
		de = fixture.debugElement.query(By.css('#radioLabel2'));
		el = de.nativeElement;
		expect(el.textContent).toContain('Starcraft II');
	});
	it('fourth item of 3 should not exist', () => {
		de = fixture.debugElement.query(By.css('#radioLabel3'));
		el = de.nativeElement;
		expect(el.textContent).toContain('');
	});
});


describe('Proper classes are assigned to HTML elements', () => {
	beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [BossyRadio],
  })
  .compileComponents();
}));
	beforeEach(() => {
		fixture = TestBed.createComponent(BossyRadio);
		rad = fixture.componentInstance;

	});

	it('form-check-inline should not be applied to <div> by default', () => {
		superConfig = new BossyRadioConfig(['Star Wars', 'Lord of the Rings', 'Starcraft II']);
		rad.config = superConfig;
		rad.ngOnInit();
    fixture.detectChanges();
		de = fixture.debugElement.query(By.css('div'));
		expect(de.classes['form-check-inline']).toEqual(false);
	});
	it('form-check-inline not applied to <div> when isInlined == false', () => {
		superConfig = new BossyRadioConfig(['Star Wars', 'Lord of the Rings', 'Starcraft II'], false);
		rad.config = superConfig;
		rad.ngOnInit();
    fixture.detectChanges();
		de = fixture.debugElement.query(By.css('div'));
		expect(de.classes['form-check-inline']).toEqual(false);
	});
	it('form-check-inline class applied when isInlined == true', () => {
		superConfig = new BossyRadioConfig(['Star Wars', 'Lord of the Rings', 'Starcraft II'], true);
		rad.config = superConfig;
		rad.ngOnInit();
    fixture.detectChanges();
		de = fixture.debugElement.query(By.css('div'));
		el = de.nativeElement;
		expect(de.classes['form-check-inline']).toEqual(true);
	});
});


describe('Inline tests for the  radio component', () => {
	beforeEach(() => {
		rad = new BossyRadio();
	});

  it('should not be inlined by default', () => {
    rad.config = {items: ['one', 'two', 'three', 'four']};
		rad.ngOnInit();
		const inlineVar = rad.isInline;

		expect(inlineVar).toEqual(false);
  });
  it('if config says inlined=true, be inlined', () => {
    rad.config = {items: ['one', 'two', 'three', 'four'], isInline: true};
		rad.ngOnInit();
		const inlineVar = rad.isInline;

		expect(inlineVar).toEqual(true);
  });
  it('if config says inlined=false, do not be inlined', () => {
    rad.config = {items: ['one', 'two', 'three', 'four'], isInline: false};
		rad.ngOnInit();
		const inlineVar = rad.isInline;

		expect(inlineVar).toEqual(false);
  });
});
