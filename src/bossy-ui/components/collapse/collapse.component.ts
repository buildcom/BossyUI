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
    if (this.areItemsExpanded[index]) {
      this.areItemsExpanded[index] = false;
      this.buttonsCollapsed[index] = 'collapsed';
    } else {
      this.areItemsExpanded[index] = true;
      this.buttonsCollapsed[index] = '';
    }
  }
}
