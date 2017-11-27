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

  textInput: string;
  textareaInput: string;
  emailInput: string;

  isFormInlinedFromConfig = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {
   
  this.http.get('http://localhost:3000/api/test').subscribe(data => {
    this.textInput = data['textInput'];
    this.textareaInput = data['textareaInput'];
    this.emailInput = data['emailInput'];
    console.log(data);
  });

  //Need to hydrate form config with get data

    const elements: any = {};

    this.isFormInlinedFromConfig = this.config.isFormInlined;
    this.config.elements.forEach((element) => {
      const {name, value} = element;
      elements[name] = value;
    });

    this.bossyForm = this.formBuilder.group(elements);
  }

  onSubmit() {
    // TODO: return form data
  }
}
