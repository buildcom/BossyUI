import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BossyFormTextareaConfig} from '../../config/bossy-form-textarea';
import {BossyFormTextareaValidatorInterface} from '../../validators/bossy-form-textarea';

@Component({
  selector: 'bossy-form-textarea',
  templateUrl: './form-textarea.html',
  styleUrls: ['./form-textarea.css'],
})
export class BossyFormTextareaComponent implements OnInit {
  @Input() config: BossyFormTextareaConfig;
  // hasValidation = 'none';
  // validationModel = [
  //
  // ]

  constructor() {
  }

  ngOnInit() {
    const {name, value, formGroup} = this.config;

    if (formGroup) {
      formGroup.addControl(name, new FormControl(value, [
        Validators.required
      ]
    ));
    }
  }

  output() {
  }
}
