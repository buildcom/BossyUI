import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BossyFormTextareaConfig} from '../../config/bossy-form-textarea';

@Component({
  selector: 'bossy-form-textarea',
  templateUrl: './form-textarea.html',
  styleUrls: ['./form-textarea.css'],
})
export class BossyFormTextareaComponent implements OnInit {
  @Input() config: BossyFormTextareaConfig;
  hasValidation = {hasSuccess: false, hasDanger: false, hasWarning: false};

  constructor() {
  }

  ngOnInit() {
    const {name, value, formGroup} = this.config;

    if (formGroup) {
      formGroup.addControl(name, new FormControl(value));
    }
  }

  output() {
  }
}
