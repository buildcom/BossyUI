import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BossyBreadcrumbComponent } from './breadcrumb.component';
import { EventEmitter } from '@angular/core/src/event_emitter';
import { BossyBreadcrumbConfig } from './breadcrumb.config';

describe('The breadcrumb ', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [BossyBreadcrumbComponent]
      });
    });
  
    it('should have one active item and one deactive item', () => {
        let bossyBreadcrumbFixture = TestBed.createComponent(BossyBreadcrumbComponent);
        let componentInstance = bossyBreadcrumbFixture.componentInstance;

        componentInstance.config= new BossyBreadcrumbConfig([
            {name: 'home', href: 'http://localhost:4200'},
            {name: 'sandbox', href: '/sandbox'},
        ]);
        
        componentInstance.currentLocation = 'http://localhost:4200/sandbox';
        componentInstance.currentPath = '/sandbox';
        componentInstance.ngOnInit();

        let deactiveItems = [
            {name: 'home', href: 'http://localhost:4200'},
        ];

        let activeItem = {name: 'sandbox', href: '/sandbox'};
        expect(componentInstance.deactiveItems).toEqual(deactiveItems);
        expect(componentInstance.activeItem).toEqual(activeItem);
    });

    it('should have one active item and five deactive items', () => {
        let bossyBreadcrumbFixture = TestBed.createComponent(BossyBreadcrumbComponent);
        let componentInstance = bossyBreadcrumbFixture.componentInstance;

        componentInstance.config= new BossyBreadcrumbConfig([
            {name: 'home', href: 'http://localhost:4200'},
            {name: 'sandbox', href: '/sandbox'},
            {name: 'example1', href: '/example1'},
            {name: 'example2', href: '/example2'},
            {name: 'example3', href: '/example3'},
            {name: 'example4', href: '/example4'},
        ]);
        
        componentInstance.currentLocation = 'http://localhost:4200/sandbox';
        componentInstance.currentPath = '/sandbox';
        componentInstance.ngOnInit();

        let deactiveItems = [
            {name: 'home', href: 'http://localhost:4200'},
            {name: 'example1', href: '/example1'},
            {name: 'example2', href: '/example2'},
            {name: 'example3', href: '/example3'},
            {name: 'example4', href: '/example4'},
        ];

        let activeItem = {name: 'sandbox', href: '/sandbox'};
        expect(componentInstance.deactiveItems).toEqual(deactiveItems);
        expect(componentInstance.activeItem).toEqual(activeItem);
    });

    it('should have one active item', () => {
        let bossyBreadcrumbFixture = TestBed.createComponent(BossyBreadcrumbComponent);
        let componentInstance = bossyBreadcrumbFixture.componentInstance;

        componentInstance.config= new BossyBreadcrumbConfig([
            {name: 'sandbox', href: '/sandbox'},
        ]);
        
        componentInstance.currentLocation = 'http://localhost:4200/sandbox';
        componentInstance.currentPath = '/sandbox';
        componentInstance.ngOnInit();

        let deactiveItems = [];

        let activeItem = {name: 'sandbox', href: '/sandbox'};
        expect(componentInstance.deactiveItems).toEqual(deactiveItems);
        expect(componentInstance.activeItem).toEqual(activeItem);
    });

    it('should not have an active item and two deactive item', () => {
        let bossyBreadcrumbFixture = TestBed.createComponent(BossyBreadcrumbComponent);
        let componentInstance = bossyBreadcrumbFixture.componentInstance;

        componentInstance.config= new BossyBreadcrumbConfig([
            {name: 'home', href: 'http://localhost:4200'},
            {name: 'sandbox', href: '/sandboxe'},
        ]);
        
        componentInstance.currentLocation = 'http://localhost:4200/sandbox';
        componentInstance.currentPath = '/sandbox';
        componentInstance.ngOnInit();

        let deactiveItems = [
            {name: 'home', href: 'http://localhost:4200'},
            {name: 'sandbox', href: '/sandboxe'},
        ];

        let activeItem;
        expect(componentInstance.deactiveItems).toEqual(deactiveItems);
        expect(componentInstance.activeItem).toEqual(activeItem);
    });
});
