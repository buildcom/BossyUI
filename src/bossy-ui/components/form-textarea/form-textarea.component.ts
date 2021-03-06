import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, NgModel} from '@angular/forms';
import {BossyFormTextareaConfig} from './form-textarea.config';

@Component({
  selector: 'bossy-form-textarea',
  templateUrl: './form-textarea.html',
  styleUrls: ['./form-textarea.css'],
})
export class BossyFormTextareaComponent implements OnInit {
  @Input() config: BossyFormTextareaConfig;
  value = '';
  status = 'none';
  textFormControl = new FormControl();

  constructor() {
  }

  ngOnInit() {
    const {name, value, formGroup} = this.config;
  }


  posterer(): void {
    const input = { emailInput: {value: this.textFormControl.value }};
    this.textFormControl.reset();
  }

  output() {
  }
}
