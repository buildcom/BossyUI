import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BossyDropdownComponent } from './dropdown.component';
import { BossyDropdownMenuItemComponent } from '../dropdown-menu/dropdown-menu.component';
import { EventEmitter } from '@angular/core/src/event_emitter';
import { BossyDropdownConfig } from './dropdown.config';
import { BossyDropdownMenuConfig } from '../dropdown-menu/dropdown-menu.config';

describe('The dropdown ', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [BossyDropdownComponent,
        BossyDropdownMenuItemComponent]
      });
    });

    it('btnShow should change', () => {
        const  bossyBreadcrumbFixture = TestBed.createComponent(BossyDropdownComponent);
        const componentInstance = bossyBreadcrumbFixture.componentInstance;

        componentInstance.config = new BossyDropdownConfig('Dropdown Menu',
        'primary',
        [
          new BossyDropdownMenuConfig('Header', 'header'),
          new BossyDropdownMenuConfig('Item 1', 'default', undefined, undefined, '#'),
          new BossyDropdownMenuConfig('Div', 'divider'),
          new BossyDropdownMenuConfig('Item 2', 'default'),
          new BossyDropdownMenuConfig('Item 3', 'default', true),
          new BossyDropdownMenuConfig('Item 4', 'default', undefined, true, '#')
        ],
        '',
        '',
        true
      );

        componentInstance.ngOnInit();

        const output = 'show';

        componentInstance.showMenuOnClick();
        expect(componentInstance.btnShow).toEqual(output);
    });
});
