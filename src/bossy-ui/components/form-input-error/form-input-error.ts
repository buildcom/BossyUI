import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

declare const module: any;

@Component({
  moduleId: module.id,
  selector: 'bossy-form-input-error',
  templateUrl: './form-input-error.html',
  styleUrls: ['./form-input-error.css']
})
export class BossyFormInputErrorComponent {
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() errorCssClass: string;
}
