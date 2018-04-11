import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyButtonConfig} from './button.config';

@Component({
  selector: 'bossy-button',
  templateUrl: './button.html',
})

export class BossyButtonComponent implements OnInit {
  @Input() config: BossyButtonConfig;
  ngOnInit() {
  }
}
