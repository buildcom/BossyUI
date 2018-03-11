import {Component, Input, OnInit, SimpleChanges, ElementRef, HostListener} from '@angular/core';
import {BossyPopoverConfig} from './popover.config';


@Component({
  selector: 'bossy-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})


export class BossyPopoverComponent implements OnInit {
  @Input() config: BossyPopoverConfig;

  constructor(private _eref: ElementRef) {}

  hide = false;
  Top = '0px';
  Left = '0px';
  eventTarget = undefined;
  Spacing = 34;
  arrowTop = '34px';

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
      this.eventTarget.addEventListener('click', this.ShowPopoverOnClick.bind(this));
      if (this.eventTarget.contains(event)) {
        this.ShowPopoverOnClick(event);
      }
    }

    if (this.config.dismissable && this.hide) {
      if (!this.eventTarget.contains(event)) {
        this.hide = false;
      }
    }
  }

  ShowPopoverOnClick(event: any) {
    this.Top = (this.eventTarget.offsetTop - this.Spacing) + 'px';
    this.Left = this.eventTarget.offsetLeft + this.eventTarget.offsetWidth + 'px';
    this.hide = !this.hide;
  }

  calcSpacing() {
    if (this.config.popoverData !== '' && this.config.popoverTitle !== '') {
      this.Spacing = 34;
      this.arrowTop = '34px';
    } else {
      this.Spacing = 0;
      this.arrowTop = '10px';
    }
  }
}
