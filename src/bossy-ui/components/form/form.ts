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

    if (this.config.getURL !== '') {
      this.http.get(this.config.getURL).subscribe(data => {
        Object.keys(data).forEach((key: string) => {
          this.bossyForm.controls[key].setValue(data[key].value);
        });
      });
    }

  }

  onSubmit() {
    // TODO: return form data
  }
}
