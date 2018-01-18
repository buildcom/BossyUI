import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BossyFormConfig} from './form.config';

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
    private http: HttpClient,
  ) {}

  ngOnInit() {
    if (this.config.definitionUrl && this.config.definitionUrl.length > 0) {
      this.http.get(this.config.definitionUrl).subscribe((data) => {
        this.config = {
          ...this.config,
          data,
        };

        if (this.config.elements) {
          this.createForm(this.config.elements);
        }
      });
    } else {
      if (this.config.elements) {
        this.createForm(this.config.elements);
      }
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
    if (this.config.getUrl) {
      this.http.get(this.config.getUrl).subscribe((results) => {
        Object.keys(results).forEach((field) => {
          if (this.bossyForm.controls[field]) {
            this.bossyForm.controls[field].setValue(results[field]);
          }
        });
      });
    }
  }

  postFormData() {
    if (this.config.postUrl) {
      this.http.post(this.bossyForm.value, this.config.postUrl).subscribe((results) => {
        Object.keys(results).forEach((field) => {
          if (this.bossyForm.controls[field]) {
            this.bossyForm.controls[field].setValue(results[field]);
          }
        });
      });
    }
  }

  onChange() {
    console.log(this.bossyForm.controls['textInput'].valid);
  }
}
