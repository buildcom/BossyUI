import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BossyPopoverComponent } from './popover.component';

/*
describe('PopoverComponent', () => {
  let component: BossyPopoverComponent;
  let fixture: ComponentFixture<BossyPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BossyPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BossyPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 
});
*/


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
});
