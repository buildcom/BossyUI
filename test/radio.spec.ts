import { async } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import {BossyFormRadio} from '../src/components/form-radio';
import {BossyFormRadioConfig} from '../src/config/form-radio';
import {RadioElement} from '../src/config/form-radio';

let rad:     BossyFormRadio;
let fixture: ComponentFixture<BossyFormRadio>;
let de:      DebugElement;
let el:      HTMLElement;
let iel:     HTMLInputElement;
let superConfig: BossyFormRadioConfig;

describe('Unit tests for Radio component: ', () => {
	fdescribe('Testbed to check textContent of <label>s', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [BossyFormRadio],
			})
			.compileComponents(); // compile template and css
		}));
		beforeEach(() => {
			fixture = TestBed.createComponent(BossyFormRadio);
			rad = fixture.componentInstance;
			superConfig = new BossyFormRadioConfig({
				componentId: 'testTitle',
				items: [
					{value: 'Option 1', isDisabled: true},
					{value: 'Option 2', isDisabled: false},
					{value: 'Option 3', isDisabled: true}
				]
			});
			rad.config = superConfig;
			rad.ngOnInit();
			fixture.detectChanges();
		});

		it('first item of 3', () => {
			de = fixture.debugElement.query(By.css('#testTitle_label0'));
			el = de.nativeElement;
			expect(el.textContent).toContain('Option 1');
		});
		it('second item of 3', () => {
			de = fixture.debugElement.query(By.css('#testTitle_label'));
			el = de.nativeElement;
			expect(el.textContent).toContain('Option 2');
		});
		it('third item of 3', () => {
			de = fixture.debugElement.query(By.css('#testTitle_label2'));
			el = de.nativeElement;
			expect(el.textContent).toContain('Option 3');
		});
		it('fourth item of 3 should not exist', () => {
			de = fixture.debugElement.query(By.css('#testTitle_label3'));
			el = de.nativeElement;
			expect(el.textContent).toContain('');
		});
	});

	describe('Proper classes are assigned to HTML elements', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [BossyFormRadio],
			})
			.compileComponents();
		}));
		beforeEach(() => {
			fixture = TestBed.createComponent(BossyFormRadio);
			rad = fixture.componentInstance;
		});

		it('form-check-inline should not be applied to <div> by default', () => {
			superConfig = new BossyFormRadioConfig({
				componentId: 'testTitle',
				items: [
					{value: 'Option 1', isDisabled: true},
					{value: 'Option 2', isDisabled: false},
					{value: 'Option 3', isDisabled: true}
				]
			});
			rad.config = superConfig;
			rad.ngOnInit();
			fixture.detectChanges();
			de = fixture.debugElement.query(By.css('div'));
			expect(de.classes['form-check-inline']).toEqual(false);
		});
		it('form-check-inline not applied to <div> when isInlined == false', () => {
			superConfig = new BossyFormRadioConfig({
				componentId: 'testTitle',
				items: [
					{value: 'Option 1', isDisabled: true},
					{value: 'Option 2', isDisabled: false},
					{value: 'Option 3', isDisabled: true}
				],
				isInline: false
			});
			rad.config = superConfig;
			rad.ngOnInit();
			fixture.detectChanges();
			de = fixture.debugElement.query(By.css('div'));
			expect(de.classes['form-check-inline']).toEqual(false);
		});
		it('form-check-inline class applied when isInlined == true', () => {
			superConfig = new BossyFormRadioConfig({
				componentId: 'testTitle',
				items: [
					{value: 'Option 1', isDisabled: true},
					{value: 'Option 2', isDisabled: false},
					{value: 'Option 3', isDisabled: true}
				],
				isInline: true
			});
			rad.config = superConfig;
			rad.ngOnInit();
			fixture.detectChanges();
			de = fixture.debugElement.query(By.css('div'));
			expect(de.classes['form-check-inline']).toEqual(true);
		});
	});

	describe('Inline tests for the radio component', () => {
		beforeEach(() => {
			rad = new BossyFormRadio();
		});

		it('should not be inlined by default', () => {
			rad.config = {
				items: [
					{value: 'one'},
					{value: 'two'},
					{value: 'three'},
					{value: 'four'}
				],
				componentId: 'myRadio'
			};
			rad.ngOnInit();
			const inlineVar = rad.isInline;

			expect(inlineVar).toEqual(false);
		});
		it('should not be inlined by default', () => {
			rad.config = {
				items: [
					{value: 'one'},
					{value: 'two'},
					{value: 'three'},
					{value: 'four'}
				],
				componentId: 'myRadio'
			};
			rad.ngOnInit();
			const inlineVar = rad.isInline;

			expect(inlineVar).toEqual(false);
		});
		it('if config says inlined=true, be inlined', () => {
			rad.config = {
				items: [
					{value: 'one'},
					{value: 'two'},
					{value: 'three'},
					{value: 'four'}
				],
				componentId: 'myRadio',
				isInline: true
			};
			rad.ngOnInit();
			const inlineVar = rad.isInline;

			expect(inlineVar).toEqual(true);
		});
		it('if config says inlined=false, do not be inlined', () => {
			rad.config = {
				items: [
					{value: 'one'},
					{value: 'two'},
					{value: 'three'},
					{value: 'four'}
				],
				componentId: 'myRadio',
				isInline: false
			};
			rad.ngOnInit();
			const inlineVar = rad.isInline;

			expect(inlineVar).toEqual(false);
		});
	});


	describe('Tests for disabled element functionality of radio component', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [BossyFormRadio],
			})
			.compileComponents(); // compile template and css
		}));
		beforeEach(() => {
			fixture = TestBed.createComponent(BossyFormRadio);
			rad = fixture.componentInstance;
		});

		describe('first item of 3 disabled', () => {
			beforeEach(() => {
				superConfig = new BossyFormRadioConfig({
					componentId: 'testTitle',
					items: [
						{value: 'Option 1', isDisabled: true},
						{value: 'Option 2', isDisabled: false},
						{value: 'Option 3', isDisabled: false}
					],
					isInline: true
				});
				rad.config = superConfig;
				rad.ngOnInit();
				fixture.detectChanges();
			});
			it('first item of 3', () => {
				de = fixture.debugElement.query(By.css('#label0'));
				expect(de.nativeElement.getAttribute('disabled')).toBeDefined;
			});
			it('second item of 3', () => {
				de = fixture.debugElement.query(By.css('#label1'));
				expect(de.nativeElement.getAttribute('disabled')).not.toBeDefined;
			});
			it('third item of 3', () => {
				de = fixture.debugElement.query(By.css('#label2'));
				expect(de.nativeElement.getAttribute('disabled')).not.toBeDefined;
			});
		});

		describe('second and third item of 3 disabled', () => {
			beforeEach(() => {
				superConfig = new BossyFormRadioConfig({
					componentId: 'testTitle',
					items: [
						{value: 'Option 1', isDisabled: false},
						{value: 'Option 2', isDisabled: true},
						{value: 'Option 3', isDisabled: true}
					],
					isInline: true
				});
				rad.config = superConfig;
				rad.ngOnInit();
				fixture.detectChanges();
			});
			it('first item of 3', () => {// id = movies
				de = fixture.debugElement.query(By.css('#label0'));
				expect(de.nativeElement.getAttribute('disabled')).not.toBeDefined;
			});
			it('second item of 3', () => {
				de = fixture.debugElement.query(By.css('#label1'));
				expect(de.nativeElement.getAttribute('disabled')).toBeDefined;
			});
			it('third item of 3', () => {
				de = fixture.debugElement.query(By.css('#label2'));
				expect(de.nativeElement.getAttribute('disabled')).toBeDefined;
			});
		});

		describe('No inputs disabled when all array elements set to false', () => {
			beforeEach(() => {
				superConfig = new BossyFormRadioConfig({
					componentId: 'testTitle',
					items: [
						{value: 'Option 1', isDisabled: false},
						{value: 'Option 2', isDisabled: false},
						{value: 'Option 3', isDisabled: false}
					],
					isInline: true
				});
				rad.config = superConfig;
				rad.ngOnInit();
				fixture.detectChanges();
			});
			it('first item of 3', () => {
				de = fixture.debugElement.query(By.css('#label0'));
				expect(de.nativeElement.getAttribute('disabled')).not.toBeDefined;
			});
			it('second item of 3', () => {
				de = fixture.debugElement.query(By.css('#label1'));
				expect(de.nativeElement.getAttribute('disabled')).not.toBeDefined;
			});
			it('third item of 3', () => {
				de = fixture.debugElement.query(By.css('#label2'));
				expect(de.nativeElement.getAttribute('disabled')).not.toBeDefined;
			});
		});

		describe('No inputs disabled when isDisabled array is not included within config', () => {
			beforeEach(() => {
				superConfig = new BossyFormRadioConfig({
					componentId: 'testTitle',
					items: [
						{value: 'Option 1'},
						{value: 'Option 2'},
						{value: 'Option 3'}
					],
					isInline: true
				});
				rad.config = superConfig;
				rad.ngOnInit();
				fixture.detectChanges();
			});
			it('first item of 3', () => {
				de = fixture.debugElement.query(By.css('#label0'));
				expect(de.nativeElement.getAttribute('disabled')).not.toBeDefined;
			});
			it('second item of 3', () => {
				de = fixture.debugElement.query(By.css('#label1'));
				expect(de.nativeElement.getAttribute('disabled')).not.toBeDefined;
			});
			it('third item of 3', () => {
				de = fixture.debugElement.query(By.css('#label2'));
				expect(de.nativeElement.getAttribute('disabled')).not.toBeDefined;
			});
		});
	});
});
