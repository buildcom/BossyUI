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
    trigger('collapseState', [
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show => hide', animate('250ms ease-in')),
      transition('hide => show', animate('250ms ease-in'))
    ])
  ]
})


export class BossyCollapseComponent implements OnInit {
  @Input() config: BossyCollapseConfig;
  areItemsExpanded: Array<boolean> = [];
  buttonsCollapsed: Array<string> = [];

  ngOnInit() {
    this.config.items.forEach(item => {
      this.areItemsExpanded.push(false);
      this.buttonsCollapsed.push('collapsed');
    });
  }

  isItemExpanded(index): boolean {
    return this.areItemsExpanded[index];
  }

  onEventClick(index) {
    if (this.config.items[index].state === 'show') {
      this.config.items[index].state = 'hide';
    } else {
      this.config.items[index].state = 'show';
    }
  }

  startCollapse(index) {
    this.config.items[index].className = 'collapsing';
  }

  doneCollapse(index) {
    this.config.items[index].className = `collapse ${this.config.items[index].state === 'show' ? 'show' : ''}`;
  }
}
