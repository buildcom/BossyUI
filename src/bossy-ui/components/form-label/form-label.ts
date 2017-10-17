import {Component, Input} from '@angular/core';
import {BossyFormLabelConfig} from '../../config/form-label';

@Component({
  selector: 'bossy-form-label',
  templateUrl: './form-label.html',
  styleUrls: ['./form-label.css'],

})
export class BossyFormLabelComponent {
  @Input() config: BossyFormLabelConfig;
  isInline = false;
  hasValidation = 'None';
}
