import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyPopoverConfig} from './popover.config';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class BossyPopoverComponent implements OnInit {
  @Input() config: BossyPopoverConfig;

  ngOnInit() {
  }

  onSelect() {}

}
