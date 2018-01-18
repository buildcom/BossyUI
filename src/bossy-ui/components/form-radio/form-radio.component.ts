import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyFormRadioConfig} from './form-radio.config';
import {BossyFormRadioElement} from './form-radio.config';
import {BossyFormConfig} from '../form/form.config';

@Component({
  selector: 'bossy-form-radio',
  templateUrl: './form-radio.html'
})
export class BossyFormRadioComponent implements OnInit {
  @Input() config: BossyFormRadioConfig;
  items: Array<BossyFormRadioElement> = [];
  componentId = '';
  isInline = false;

  constructor() {
  }

  ngOnInit() {
    this.config.items.forEach((element) => {
      this.items.push(element);
    });

    this.componentId = this.config.componentId;

    if (this.config.isInline !== undefined) {
      this.isInline = this.config.isInline;
    }
  }
}
