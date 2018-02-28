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

  ngOnInit() {
    this.Top = '0px';
    this.Left = '0px';
    this.hide = false;
  }

  @HostListener('document:click', ['$event.target'])
  onClick(event: any) {
    if (this.config.dismissable && this.hide) {
      if (!this._eref.nativeElement.contains(event)) {
        this.hide = false;
      }
    }
  }

  ShowPopoverOnClick(event: any) {
    this.Top = (event.target.offsetTop - 34) + 'px';
    this.Left = event.target.offsetLeft + event.target.offsetWidth + 'px';
    this.hide = !this.hide;
  }
}
