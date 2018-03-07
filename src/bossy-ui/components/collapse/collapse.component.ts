import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyCollapseConfig} from './collapse.config';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'bossy-collapse',
  templateUrl: './collapse.html',
})

export class BossyCollapseComponent implements OnInit {
  @Input() config: BossyCollapseConfig;
  isShowing = false;
  show = '';
  buttonCollapsed = 'collapsed';

  ngOnInit() {

  }

  onEventClick() {
      if (this.isShowing) {
        this.show = '';
        this.isShowing = false;
        this.buttonCollapsed = 'collapsed';
      } else {
        this.show = 'show';
        this.isShowing = true;
        this.buttonCollapsed = '';
      }
  }
}
