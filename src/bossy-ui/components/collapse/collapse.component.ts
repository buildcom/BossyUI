import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { BossyCollapseConfig } from './collapse.config';
import { Console } from '@angular/core/src/console';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';

@Component({
  selector: 'bossy-collapse',
  templateUrl: './collapse.html',
  animations: [
    trigger('collapseAnimation', [
      state('true', style({ height: '*', fontSize: '14px' })),
      state('false', style({ height: '0px', fontSize: '0px' })),
      transition('1 => 0', animate('250ms ease-in')),
      transition('0 => 1', animate('250ms ease-out'))
    ])
  ]
})


export class BossyCollapseComponent implements OnInit {
  @Input() config: BossyCollapseConfig;
  isShowing: Array<boolean> = [];
  buttonCollapsed: Array<string> = [];
  i: number;

  ngOnInit() {
    for (this.i = 0; this.i < this.config.items.length; this.i++) {
      this.isShowing.push(false);
      this.buttonCollapsed.push('collapsed');
    }
  }

  getIsShowing(index): boolean {
    return this.isShowing[index];
  }

  show(index): string {
    if (this.isShowing[index]) {
      return 'collapse show';
    } else {
      return 'collapsing';
    }
  }

  onEventClick(index) {
    if (this.isShowing[index]) {
      this.isShowing[index] = false;
      this.buttonCollapsed[index] = 'collapsed';
    } else {
      this.isShowing[index] = true;
      this.buttonCollapsed[index] = '';
    }
  }
}
