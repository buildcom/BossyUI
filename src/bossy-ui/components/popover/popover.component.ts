import {Component, Input, OnInit, SimpleChanges, ElementRef, HostListener, ChangeDetectorRef} from '@angular/core';
import {BossyPopoverConfig} from './popover.config';


@Component({
  selector: 'bossy-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})


export class BossyPopoverComponent implements OnInit {
  @Input() config: BossyPopoverConfig;

  constructor(private _eref: ElementRef, private cdRef: ChangeDetectorRef) {}

  hide = false;
  popoverTop = '0px';
  popoverLeft = '0px';
  eventTarget = undefined;
  arrowSpacing = 34;
  arrowTop = '34px';
  arrowLeft = '0px';
  arrowRotate = 'rotate(0deg)';
  dismissable = false;

  ngOnInit() {
    this.dismissable = Boolean(this.config.isDismissable);
    this.calcSpacing();
    const elements = this._eref.nativeElement.querySelectorAll('button');
    this.eventTarget = elements[0];
    if (this.eventTarget !== undefined) {
      this.eventTarget.addEventListener('click', this.ShowPopoverOnClick.bind(this));
    } else {
      console.error('Popover could not resolve element', this.config.popoverID);
    }
  }


  /*
  * Function this function makes the popover dismiss when clicked outside of it.
  */
  @HostListener('document:click', ['$event.target'])
  onClick(event: any) {
    if (this.eventTarget !== undefined && this.config.isDismissable && this.hide) {
      const popover_ref = this._eref.nativeElement.querySelectorAll('div.popover')[0];
      if (!this.eventTarget.contains(event) && !popover_ref.contains(event)) {
        this.hide = false;
      }
    }
  }


  /*
  * Function to recalculate everytime where the event target is on screen and place the popover
  *
  * Better solution: maybe add a host listener to the event target if position changes update position
  *                  of the popover and arrow variables. That would clean this up.
  */
  ShowPopoverOnClick(event: any) {
    if (this.eventTarget !== undefined) {
      if (this.config.placement === 'top') {
        this.hide = !this.hide;
        this.cdRef.detectChanges();
        const popover_ref = this._eref.nativeElement.querySelectorAll('div.popover')[0];
        if (popover_ref !== undefined) {
          this.popoverTop = (this.eventTarget.offsetTop - (popover_ref.offsetHeight)) - (this.arrowSpacing / 4) + 'px';
          this.popoverLeft = this.eventTarget.offsetLeft + (this.eventTarget.offsetWidth / 2) - (popover_ref.offsetWidth / 2) + 'px';
          this.arrowTop =  (popover_ref.offsetHeight - 10) + 'px';
          this.arrowLeft = popover_ref.offsetWidth / 2 + 'px';
          this.arrowRotate = 'rotate(270deg)';
        }
      } else if (this.config.placement === 'bottom') {
        this.hide = !this.hide;
        this.cdRef.detectChanges();
        const popover_ref = this._eref.nativeElement.querySelectorAll('div.popover')[0];
        if (popover_ref !== undefined) {
          this.popoverTop = (this.eventTarget.offsetTop + (this.eventTarget.offsetHeight)) + (this.arrowSpacing / 4) + 'px';
          this.popoverLeft = this.eventTarget.offsetLeft + (this.eventTarget.offsetWidth / 2) - (popover_ref.offsetWidth / 2) + 'px';
          this.arrowTop = '-16px';
          this.arrowLeft = popover_ref.offsetWidth / 2 + 'px';
          this.arrowRotate = 'rotate(90deg)';
        }
      } else if (this.config.placement === 'left') {
        this.hide = !this.hide;
        this.cdRef.detectChanges();
        const popover_ref = this._eref.nativeElement.querySelectorAll('div.popover')[0];
        if (popover_ref !== undefined) {
          this.popoverLeft = (this.eventTarget.offsetLeft - popover_ref.offsetWidth - (this.arrowSpacing / 2 )) + 'px';
          this.popoverTop = (this.eventTarget.offsetTop - ((popover_ref.offsetHeight / 2) - this.eventTarget.offsetHeight / 2 )) + 'px';
          this.arrowTop = popover_ref.offsetHeight / 2 - (popover_ref.firstElementChild.offsetHeight / 2) + 'px';
          this.arrowLeft = (popover_ref.offsetWidth - 1) + 'px';
          this.arrowRotate = 'rotate(180deg)';
        }
      } else {
        if (this.config.placement !== 'right') {
          console.error('invalid placement defaulting to {placement: right}');
        }
        this.hide = !this.hide;
        this.cdRef.detectChanges();
        const popover_ref = this._eref.nativeElement.querySelectorAll('div.popover')[0];
        if (popover_ref !== undefined) {
          this.popoverTop = (this.eventTarget.offsetTop - ((popover_ref.offsetHeight / 2) - this.eventTarget.offsetHeight / 2)) + 'px';
          this.popoverLeft = this.eventTarget.offsetLeft + this.eventTarget.offsetWidth + 'px';
          this.arrowTop = popover_ref.offsetHeight / 2 - (popover_ref.firstElementChild.offsetHeight / 2) + 'px';
          this.arrowLeft = '-8px';
          this.arrowRotate = 'rotate(0deg)';
        }
      }
    }
  }


  /*
  * Function when users only specify one field the spacing needs to be modified
  * so the popover dosen't look 'Super Gross'.
  */
  calcSpacing() {
    if (this.config.placement === 'top' || this.config.placement === 'bottom') {
      if (this.config.popoverData !== '' && this.config.popoverTitle !== '') {
        this.arrowSpacing = 34;
        this.arrowTop = '34px';
      } else {
        this.arrowSpacing = 17;
        this.arrowTop = '10px';
      }
    } else {
      if (this.config.popoverData !== '' && this.config.popoverTitle !== '') {
        this.arrowSpacing = 34;
        this.arrowTop = '34px';
      } else {
        this.arrowSpacing = 34;
        this.arrowTop = '12px';
      }
    }
  }
}
