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
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentFixture.detectChanges();
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).toContain(popoverElement);
  });
  it('not be active', () => {
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = false;
    componentFixture.detectChanges();
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).not.toContain(popoverElement);
  });

  it('not be active after dismiss event', () => {
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentFixture.detectChanges();
    let buttonClick = componentFixture.debugElement.nativeElement.querySelector('button');
    buttonClick.click();
    componentFixture.detectChanges();
    console.log("third test");
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).not.toContain(popoverElement);
  });

  it('be active after dismiss event', () => {
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentInstance.dismissable = false;
    componentFixture.detectChanges();
    console.log("fourth test");
    console.log(componentInstance);
    //componentFixture.detectChanges();
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).toContain(popoverElement);
  });

/*
  it('ensure dismissing an inactive popover wont active the popover', () => {
    let componentFixture = TestBed.createComponent(BossyPopoverComponent);
    let componentInstance = componentFixture.componentInstance;
    componentInstance.hide = true;
    componentFixture.detectChanges();
    //componentInstance.onClick(event);
    componentFixture.detectChanges();
    let popoverElement = componentFixture.debugElement.query(e1 => e1.name === 'popover');
    expect(componentFixture.nativeElement).not.toContain(popoverElement);
  });
  */
});
