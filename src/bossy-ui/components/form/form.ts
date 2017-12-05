import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BossyFormConfig} from '../../config/form';

@Component({
  selector: 'bossy-form',
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class BossyFormComponent implements OnInit {
  @Input() config: BossyFormConfig;
  bossyForm: FormGroup;
  isFormInlinedFromConfig = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const elements: any = {};

    this.isFormInlinedFromConfig = this.config.isFormInlined;
    this.config.elements.forEach((element) => {
      const {name, value, validators} = element;
      const bossyValidators = [];
      if (validators && validators[0]) {
        for (const valids in validators) {
          if (Validators[validators[valids].type] != null) {
            if (validators[valids].type === 'required') {
              bossyValidators.push(Validators[validators[valids].type]);
            } else if (Validators[validators[valids].type](validators[valids].value) != null) {
              bossyValidators.push(Validators[validators[valids].type](validators[valids].value));
            }
          }
        }
      }
      elements[name] = [value, bossyValidators];
    });
    this.bossyForm = this.formBuilder.group(elements);
  }

  onSubmit() {
    // TODO: return form data
  }

  onChange() {
    console.log(this.bossyForm.controls['textInput'].valid);
  }
}
