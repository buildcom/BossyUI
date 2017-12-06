import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {BossyFormConfig} from '../../bossy-ui/config/form';
import {BossyFormElementConfig} from '../../bossy-ui/config/form-element';
import {BossyFormComponent} from '../../bossy-ui/components/form/form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formConfig: BossyFormConfig = new BossyFormConfig();

  constructor(
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.formConfig.definitionUrl = 'http://localhost:3000/api/addresses/definition';
    this.formConfig.getUrl = 'http://localhost:3000/api/addresses/2';
    this.formConfig.postUrl = 'http://localhost:3000/api/addresses';
  }
}
