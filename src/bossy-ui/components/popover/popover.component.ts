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
  ngOnInit() {  }

  ShowPopoverOnClick(event: any) {

    this.hide = !this.hide;
    console.log('help');
  }

}
