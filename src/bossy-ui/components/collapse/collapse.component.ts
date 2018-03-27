import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyCollapseConfig} from './collapse.config';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'bossy-collapse',
  templateUrl: './collapse.html',
})

export class BossyCollapseComponent implements OnInit {
  @Input() config: BossyCollapseConfig;
  isShowing: Array<boolean> = [];
  show: Array<string> = [];
  buttonCollapsed: Array<string> = [];
  i: number;

  ngOnInit() {
      for (this.i = 0; this.i < this.config.items.length; this.i++) {
        this.isShowing.push(false);
        this.show.push('');
        this.buttonCollapsed.push('collapsed');
      }
  }

  onEventClick(index) {
      if (this.isShowing[index]) {
        this.show[index] = '';
        this.isShowing[index] = false;
        this.buttonCollapsed[index] = 'collapsed';
      } else {
        this.show[index] = 'show';
        this.isShowing[index] = true;
        this.buttonCollapsed[index] = '';
      }
  }
}
