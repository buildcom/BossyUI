import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BossyFormConfig} from './form.config';
import {FormService} from '../../services/form';

@Component({
  selector: 'bossy-form',
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class BossyFormComponent implements OnInit {
  @Input() config: BossyFormConfig = new BossyFormConfig();

  bossyForm: FormGroup = new FormGroup({});
  isFormInlinedFromConfig = false;
  elementErrors = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit() {
    if (this.config.definitionUrl && this.config.definitionUrl.length > 0) {
      this.formService.get(this.config.definitionUrl).subscribe((data) => {
        this.config = {
          ...this.config,
          ...data.definition,
        };

        if (this.config.elements) {
          this.createForm(this.config.elements);
        }
      });
    }
  }

  createForm(elements) {
    const controls = {};

    elements.forEach((element) => {
      const { name, type, validators = [], value } = element;
      const validation = validators.map((validator) => {
        if (validator.value) {
          return Validators[validator.type](validator.value);
        }
        return Validators[validator.type];
      });

      controls[name] = [value, validation];
    });

    this.bossyForm = this.formBuilder.group(controls);
  }

  getFormData() {
    console.log(this.config);

    if (this.config.getUrl) {
      this.formService.get(this.config.getUrl).subscribe((results) => {
        Object.keys(results.data).forEach((field) => {
          if (this.bossyForm.controls[field]) {
            this.bossyForm.controls[field].setValue(results.data[field]);
          }
        });
      });
    }
  }

  postFormData() {
    if (this.config.postUrl) {
      this.formService.post(this.bossyForm.value, this.config.postUrl).subscribe((results) => {
        Object.keys(results.data).forEach((field) => {
          if (this.bossyForm.controls[field]) {
            this.bossyForm.controls[field].setValue(results.data[field]);
          }
        });
      });
    }
  }

  onChange() {
    console.log(this.bossyForm.controls['textInput'].valid);
  }
}
