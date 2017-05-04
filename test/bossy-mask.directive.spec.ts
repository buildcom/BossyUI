import {BossyMaskDirective} from '../src/directives/bossy-mask.directive';
import {Component, OnInit, ElementRef} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement}    from '@angular/core';
import {By} from '@angular/platform-browser';

let directive: BossyMaskDirective;

describe('In the bossy-mask directive', () => {
	beforeEach(() => {
		directive = new BossyMaskDirective(new ElementRef(0));
	});

	it('the SSN function should format the numbers appropriately', () => {
		let value = directive.ssn('123456789');
		expect(value).toEqual('123-45-6789');
	});
	it('the SSN function should format the numbers appropriately', () => {
		let value = directive.phone('5555555555');
		expect(value).toEqual('(555) 555-5555');
	});
});

