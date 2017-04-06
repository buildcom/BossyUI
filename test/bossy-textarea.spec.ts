import {async, TestBed} from '@angular/core/testing';

import {BossyInput} from '../src/components/input';
import {BossyInputConfig} from '../src/config/input';

describe('Component: Bossy Input', () => {
	let component: BossyInput;
	beforeEach(async(() => {
		TestBed.configureTestingModule({declarations: [BossyInput] , })
			.compileComponents()
			.then(() => {
				const fixture = TestBed.createComponent(BossyInput);
				component = fixture.componentInstance;
			});
		}));
	it('should have a defined component', () => {
		expect(component).toBeDefined();
	});
});
