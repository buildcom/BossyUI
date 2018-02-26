import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyPopoverConfig} from './popover.config';


@Component({
  selector: 'bossy-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class BossyPopoverComponent implements OnInit {
  @Input() config: BossyPopoverConfig;
  hide = false;
  Top = "0px";
  Left = "0px";
  ngOnInit() {
    this.config.popoverLeft = 0;
    this.Top = "0px";
    this.Left = "0px";
    }

  ShowPopoverOnClick(event: any) {
    {/*this.config.popoverTop = event.target.offsetTop;
    this.config.popoverLeft = event.target.offsetLeft + event.target.offsetWidth;*/}
    this.Top = (event.target.offsetTop - 34) + "px";
    this.Left = event.target.offsetLeft + event.target.offsetWidth + "px";
    this.hide = !this.hide;
    console.log(event.target.offsetTop);
    console.log(event.target.offsetHeight);
    console.log(event.target.parentElement.offsetTop);
    console.log(event.target.offsetWidth);

  }

}
