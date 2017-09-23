import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BossyFormInputConfig} from '../../config/form-input';

declare const module: any;

@Component({
  moduleId: module.id,
  selector: 'bossy-form-input',
  templateUrl: './form-input.html',
  styleUrls: ['./form-input.css'],
})
export class BossyFormInputComponent implements OnInit {
  @Input() config: BossyFormInputConfig;
  hasSuccess = false;
  hasWarning = false;
  hasDanger = false;

  constructor() {
  }

  ngOnInit() {
    const {name, value, formGroup} = this.config;

    if (formGroup) {
      console.log('formgroup', name);

      formGroup.addControl(name, new FormControl(value));
    }
  }

  output() {
  }
}
