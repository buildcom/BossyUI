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
  Top = '0px';
  Left = '0px';
  eventTarget = undefined;
  Spacing = 34;
  arrowTop = '34px';
  arrowLeft = '0px';
  rotate = 'rotate(0deg)';

  ngOnInit() {
    this.Top = '0px';
    this.Left = '0px';
    this.hide = false;
    this.eventTarget = undefined;
    this.Spacing = 34;
    this.arrowTop = '34px';
  }

  @HostListener('document:click', ['$event.target'])
  onClick(event: any) {
    // This initial if state should only run once and find the popover element assoiciated with and adds an event listener
    if (this.eventTarget === undefined) {
      this.calcSpacing();
      const elements = document.body.querySelectorAll('[id=' + this.config.popoverID + ']');
      this.eventTarget = elements[0];
      if (this.eventTarget !== undefined) {
        this.eventTarget.addEventListener('click', this.ShowPopoverOnClick.bind(this));
        if (this.eventTarget.contains(event)) {
          this.ShowPopoverOnClick(event);
        }
      } else {
        console.error('Popover could not resolve element', this.config.popoverID);
      }
    }


    if (this.eventTarget !== undefined && this.config.dismissable && this.hide) {
      if (!this.eventTarget.contains(event)) {
        this.hide = false;
      }
    }
  }


  ShowPopoverOnClick(event: any) {
    if (this.eventTarget !== undefined) {
      if (this.config.placement === 'top') {
        this.hide = !this.hide;
        this.cdRef.detectChanges();
        const popover_ref = this._eref.nativeElement.querySelectorAll('div.popover')[0];
        if (popover_ref !== undefined) {
          this.Top = (this.eventTarget.offsetTop - (popover_ref.offsetHeight)) - (this.Spacing / 4) + 'px';
          this.Left = this.eventTarget.offsetLeft + (this.eventTarget.offsetWidth / 2) - (popover_ref.offsetWidth / 2) + 'px';
          this.arrowTop =  (popover_ref.offsetHeight - 10) + 'px';
          this.arrowLeft = popover_ref.offsetWidth / 2 + 'px';
          this.rotate = 'rotate(270deg)';
        }
      } else if (this.config.placement === 'bottom') {
        this.hide = !this.hide;
        this.cdRef.detectChanges();
        const popover_ref = this._eref.nativeElement.querySelectorAll('div.popover')[0];
        if (popover_ref !== undefined) {
          this.Top = (this.eventTarget.offsetTop + (this.eventTarget.offsetHeight)) + (this.Spacing / 4) + 'px';
          this.Left = this.eventTarget.offsetLeft + (this.eventTarget.offsetWidth / 2) - (popover_ref.offsetWidth / 2) + 'px';
          this.arrowTop = '-16px';
          this.arrowLeft = popover_ref.offsetWidth / 2 + 'px';
          this.rotate = 'rotate(90deg)';
        }
      } else if (this.config.placement === 'left') {
        this.hide = !this.hide;
        this.cdRef.detectChanges();
        const popover_ref = this._eref.nativeElement.querySelectorAll('div.popover')[0];
        if (popover_ref !== undefined) {
          this.Left = (this.eventTarget.offsetLeft - popover_ref.offsetWidth - (this.Spacing / 2 )) + 'px';
          this.Top = (this.eventTarget.offsetTop - ((popover_ref.offsetHeight / 2) - this.eventTarget.offsetHeight / 2 )) + 'px';
          this.arrowTop = popover_ref.offsetHeight / 2 - (popover_ref.firstElementChild.offsetHeight / 2) + 'px';
          this.arrowLeft = (popover_ref.offsetWidth - 1) + 'px';
          this.rotate = 'rotate(180deg)';
        }
      } else {
        if (this.config.placement !== 'right') {
          console.error('invalid placement defaulting to {placement: right}');
        }
        this.hide = !this.hide;
        this.cdRef.detectChanges();
        const popover_ref = this._eref.nativeElement.querySelectorAll('div.popover')[0];
        if (popover_ref !== undefined) {
          this.Top = (this.eventTarget.offsetTop - ((popover_ref.offsetHeight / 2) - this.eventTarget.offsetHeight / 2)) + 'px';
          this.Left = this.eventTarget.offsetLeft + this.eventTarget.offsetWidth + 'px';
          this.arrowTop = popover_ref.offsetHeight / 2 - (popover_ref.firstElementChild.offsetHeight / 2) + 'px';
          this.arrowLeft = '-8px';
          this.rotate = 'rotate(0deg)';
        }
      }
    }
  }

  calcSpacing() {
    if (this.config.placement === 'top' || this.config.placement === 'bottom') {
      if (this.config.popoverData !== '' && this.config.popoverTitle !== '') {
        this.Spacing = 34;
        this.arrowTop = '34px';
      } else {
        this.Spacing = 17;
        this.arrowTop = '10px';
      }
    } else {
      if (this.config.popoverData !== '' && this.config.popoverTitle !== '') {
        this.Spacing = 34;
        this.arrowTop = '34px';
      } else {
        this.Spacing = 34;
        this.arrowTop = '12px';
      }
    }
  }
}
