import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BossyPopoverComponent } from './popover.component';

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
