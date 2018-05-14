import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyButtonConfig} from './button.config';

@Component({
  selector: 'bossy-button',
  templateUrl: './button.html',
})

export class BossyButtonComponent implements OnInit {
  @Input() config: BossyButtonConfig;
  defaultName = '';
  type = '';
  size = '';
  outline = '';
  active = '';
  disabled = '';
  block = '';

  ngOnInit() {
    // Outline
    if ( this.config.outline === true ) {
      this.outline = 'outline-';
    }
    // Type
    if ( this.config.type !== '' ) {
      this.type = ' btn-' + this.outline + this.config.type;
    } else {
      this.type = '';
    }
    // Size
    if ( this.config.size !== '' ) {
      this.size = ' btn-' + this.config.size;
    } else {
      this.size = '';
    }
    // Active
    if ( this.config.active === true) {
      this.active = ' active';
    } else {
      this.active = '';
    }
    // Block
    if ( this.config.block === true) {
      this.block = ' btn-block';
    } else {
      this.block = '';
    }
  }
}
