import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BossyPopoverComponent } from './popover.component';
import { EventEmitter } from '@angular/core/src/event_emitter';


describe('the popover derp...', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossyPopoverComponent]
    });
  });
  
  it('test weather it is active or not.', () => {
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentFixture.detectChanges();
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).toContain(popoverElement);
  });
  it('test weather it is active or not.', () => {
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = false;
    componentFixture.detectChanges();
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).not.toContain(popoverElement);
  });

  it('test if popover can be dissmissed', () => {
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentFixture.detectChanges();
    //componentInstance.onClick(event);
    componentFixture.detectChanges();
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).not.toContain(popoverElement);
  });

  it('test if popover can be dissmissed', () => {
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentFixture.detectChanges();
    //componentInstance.onClick(event);
    componentFixture.detectChanges();
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).not.toContain(popoverElement);
  });

  it('test if popover can be dissmissed', () => {
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentInstance.config.dismissable = false;
    componentFixture.detectChanges();
    //componentInstance.onClick(event);
    componentFixture.detectChanges();
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).not.toContain(popoverElement);
  });
});
