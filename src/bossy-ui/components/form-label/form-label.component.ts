import {Component, Input} from '@angular/core';
import {BossyFormLabelConfig} from './form-label.config';

@Component({
  selector: 'bossy-form-label',
  templateUrl: './form-label.html',
  styleUrls: ['./form-label.css'],

})
export class BossyFormLabelComponent {
  @Input() config: BossyFormLabelConfig;
  isInline = false;
  status = 'none';
}
