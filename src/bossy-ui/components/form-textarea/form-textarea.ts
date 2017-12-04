import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, NgModel} from '@angular/forms';
import {BossyFormTextareaConfig} from '../../config/bossy-form-textarea';

@Component({
  selector: 'bossy-form-textarea',
  templateUrl: './form-textarea.html',
  styleUrls: ['./form-textarea.css'],
})
export class BossyFormTextareaComponent implements OnInit {
  @Input() config: BossyFormTextareaConfig;

  value = '';
  status = 'none';

  constructor() {
  }

  ngOnInit() {
    const {name, value, formGroup} = this.config;

  }

  output() {
  }
}
