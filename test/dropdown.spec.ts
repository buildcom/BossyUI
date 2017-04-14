import { async } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { BossyDropdownMenuItem } from '../src/components/dropdown-menu';
import { BossyDropdownMenuItemConfig } from '../src/config/dropdown-menu';

let dropdown:    BossyDropdownMenuItem;
let fixture:     ComponentFixture<BossyDropdownMenuItem>;
let de:          DebugElement;
let el:          HTMLElement;
let superConfig: BossyDropdownMenuItemConfig;

fdescribe('Unit test for Dropdown Component', () => {
	describe('Testbed to check SanityTest', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [BossyDropdownMenuItem],
			})
			.compileComponents(); // compile template and css
		}));
		beforeEach(() => {
			fixture = TestBed.createComponent(BossyDropdownMenuItem);
			dropdown = fixture.componentInstance;
			superConfig = new BossyDropdownMenuItemConfig('button', 'Item 2');
			dropdown.config = superConfig;
			// dropdown.ngOnInit();
			fixture.detectChanges();
		});
		it('Sanity Check', () => {
			// de = fixture.debugElement.query(By.css('#myRadio0'));
			// el = de.nativeElement;
			expect('true').toContain('true');
		});
	});
});
