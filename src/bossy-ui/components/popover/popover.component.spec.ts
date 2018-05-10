import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BossyPopoverComponent } from './popover.component';
import { EventEmitter } from '@angular/core/src/event_emitter';
import { BossyPopoverConfig } from './popover.config';


let SuperConfig: BossyPopoverConfig;


describe('the popover should', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BossyPopoverComponent]
    });
  });

  it('be active', () => {
    const componentFixture = TestBed.createComponent(BossyPopoverComponent);
    const componentInstance = componentFixture.componentInstance;
    SuperConfig = new BossyPopoverConfig('popover',
                                         'popover1234',
                                         true,
                                         'right',
                                         'PoverOver Title',
                                         'Popover Description'
                                        );

    componentInstance.config = SuperConfig;
    componentInstance.ngOnInit();
    componentFixture.detectChanges();
    const buttonClick = componentFixture.debugElement.nativeElement.querySelector('button');
    componentInstance.ShowPopoverOnClick(buttonClick.click());
    componentFixture.detectChanges();
    const popoverElement = componentFixture.debugElement.nativeElement.querySelectorAll('div.popover')[0];
    expect(popoverElement).toBeTruthy();
  });

  it('not be active', () => {
    const componentFixture = TestBed.createComponent(BossyPopoverComponent);
    const componentInstance = componentFixture.componentInstance;
    SuperConfig = new BossyPopoverConfig('popover',
                                         'popover1234',
                                          false,
                                         'left',
                                         '',
                                         'Popover Description'
                                        );

    componentInstance.config = SuperConfig;
    componentInstance.ngOnInit();
    componentFixture.detectChanges();
    const popoverElement = componentFixture.debugElement.nativeElement.querySelectorAll('div.popover')[0];
    expect(popoverElement).toBeFalsy();
  });

  it('not be active after click event', () => {
    const componentFixture = TestBed.createComponent(BossyPopoverComponent);
    const componentInstance = componentFixture.componentInstance;
    SuperConfig = new BossyPopoverConfig('popover',
                                         'popover1234',
                                         true,
                                         'left',
                                         '',
                                         'Popover Description'
                                        );

    componentInstance.config = SuperConfig;
    componentInstance.ngOnInit();
    componentFixture.detectChanges();

    const buttonClick = componentFixture.debugElement.nativeElement.querySelector('button');
    componentInstance.ShowPopoverOnClick(buttonClick.click());
    componentFixture.detectChanges();

    const popoverElement1 = componentFixture.debugElement.nativeElement.querySelectorAll('div.popover')[0];
    expect(popoverElement1).toBeTruthy();

    document.dispatchEvent(new MouseEvent('click'));
    componentFixture.detectChanges();

    const popoverElement2 = componentFixture.debugElement.nativeElement.querySelectorAll('div.popover')[0];
    expect(popoverElement2).toBeFalsy();

  });

  /** */
  it('be active after click event', () => {
    const componentFixture = TestBed.createComponent(BossyPopoverComponent);
    const componentInstance = componentFixture.componentInstance;
    SuperConfig = new BossyPopoverConfig('popover',
                                         'popover1234',
                                         false,
                                         'top',
                                         '',
                                         'Popover Description'
                                        );

    componentInstance.config = SuperConfig;
    componentInstance.ngOnInit();
    componentFixture.detectChanges();

    const buttonClick = componentFixture.debugElement.nativeElement.querySelector('button');
    componentInstance.ShowPopoverOnClick(buttonClick.click());
    componentFixture.detectChanges();

    const popoverElement1 = componentFixture.debugElement.nativeElement.querySelectorAll('div.popover')[0];
    expect(popoverElement1).toBeTruthy();

    document.dispatchEvent(new MouseEvent('click'));
    componentFixture.detectChanges();

    const popoverElement2 = componentFixture.debugElement.nativeElement.querySelectorAll('div.popover')[0];
    expect(popoverElement2).toBeTruthy();
  });
  /**/
});
