import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BossyPopoverComponent } from './popover.component';
import { EventEmitter } from '@angular/core/src/event_emitter';


describe('the popover should', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossyPopoverComponent]
    });
  });

  it('be active', () => {
    const componentFixture = TestBed.createComponent(BossyPopoverComponent);
    const componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentFixture.detectChanges();
    const popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(popoverElement).toBeTruthy();
  });

  it('not be active', () => {
    const componentFixture = TestBed.createComponent(BossyPopoverComponent);
    const componentInstance = componentFixture.componentInstance;
    componentInstance.hide = false;
    componentFixture.detectChanges();
    const popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(popoverElement).toBeFalsy();

  });

  it('not be active after dismiss event', () => {
    const componentFixture = TestBed.createComponent(BossyPopoverComponent);
    const componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentInstance.dismissable = true;
    componentFixture.detectChanges();
    const buttonClick = componentFixture.debugElement.nativeElement.querySelector('button');
    buttonClick.click();
    componentFixture.detectChanges();
    const popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(popoverElement).toBeFalsy();

  });

  it('be active after dismiss event', () => {
    const componentFixture = TestBed.createComponent(BossyPopoverComponent);
    const componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentFixture.detectChanges();
    const buttonClick = componentFixture.debugElement.nativeElement.querySelector('button');
    buttonClick.click();
    componentFixture.detectChanges();
    const popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(popoverElement).toBeTruthy();
  });
});
