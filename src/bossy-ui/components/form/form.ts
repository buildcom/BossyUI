import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BossyFormConfig} from '../../config/form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'bossy-form',
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class BossyFormComponent implements OnInit {
  @Input() config: BossyFormConfig;

  bossyForm: FormGroup;

  isFormInlinedFromConfig = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {

    const elements: any = {};

    this.isFormInlinedFromConfig = this.config.isFormInlined;
    this.config.elements.forEach((element) => {
      const {name, value} = element;
      elements[name] = value;
    });

    this.bossyForm = this.formBuilder.group(elements);

    this.http.get('http://localhost:3000/api/test').subscribe(data => {
      this.bossyForm.controls.textInput.setValue(data['textInput']);
      this.bossyForm.controls.textareaInput.setValue(data['textareaInput']);
      this.bossyForm.controls.emailInput.setValue(data['emailInput']);
      console.log(this.bossyForm);
    });

  }

  onSubmit() {
    // TODO: return form data
  }
}
