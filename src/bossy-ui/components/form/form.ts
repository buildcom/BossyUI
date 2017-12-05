import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BossyFormConfig} from '../../config/form';
import {FormService} from "../../services/form";
//import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'bossy-form',
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class BossyFormComponent implements OnInit {
  @Input() config: BossyFormConfig;

  bossyForm: FormGroup;

  isFormInlinedFromConfig = false;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService) {
  }

  ngOnInit() {

    const elements: any = {};
//console.log(this.config);
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

    if (this.config.getUrl !== '') {
      this.formService.get(this.config.getUrl).subscribe(data => {
        Object.keys(data).forEach((key: string) => {
          this.bossyForm.controls[key].setValue(data[key].value);
        });
      });
    }

  }

  onSubmit() {
    // TODO: return form data

    this.formService.post(this.bossyForm.value, this.config.postUrl);

    //console.log(this.bossyForm.value)
  }

  onChange() {
    console.log(this.bossyForm.controls['textInput'].valid);
  }
}
