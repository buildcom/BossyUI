import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'bossy-form-element-error',
  templateUrl: './form-element-error.html',
  styleUrls: ['./form-element-error.css']
})
export class BossyFormElementErrorComponent {
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() errorCssClass: string;
}
