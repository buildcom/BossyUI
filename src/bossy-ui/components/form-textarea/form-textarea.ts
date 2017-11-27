import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, NgModel} from '@angular/forms';
import {BossyFormTextareaConfig} from '../../config/bossy-form-textarea';
import {BossyFormTextareaValidatorInterface} from '../../validators/bossy-form-textarea';

@Component({
  selector: 'bossy-form-textarea',
  templateUrl: './form-textarea.html',
  styleUrls: ['./form-textarea.css'],
})
export class BossyFormTextareaComponent implements OnInit {
  @Input() config: BossyFormTextareaConfig;

  value = '';
  form = new FormGroup({})
  status = 'none';

  constructor() {
  }

  ngOnInit() {
    const {name, value, formGroup} = this.config;

    // value = element
    // validators = list of validators for the element
    // this.form.controls.
      // this.form.addControl(value, new FormControl(value, {
        // validators: Validators.required
      // Validators.require()
    // }));

    // Validators.minLength(1);
    // const type = 'minlength';
    // const type_value = 1;
    // Validators[type](type_value);
    // Validators['required'];
    // {minlength: {1}}
    // {email : {{required,null}, {minlength,1}, {type,string}}}

    // config.
    //  elements.
    //    type: 'email;
    //      validators: [
    //       {type: required},
    //       {type:'minlength',value: }
    //      ]
  }

  onChange(value:string) {
      this.value = value;
      console.log("Value is: %s", this.value)
      this.form.patchValue({value : this.value})
  }

  output() {
  }
}
