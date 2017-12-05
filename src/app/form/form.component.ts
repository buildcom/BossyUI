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

  bossyForm = BossyFormComponent;
  config: BossyFormConfig;

  constructor(private configService: ConfigService) { }

  ngOnInit() {

    const formInputTest1 = {
        name: 'First Name',
        type: 'text',
        validators : [
          {type: 'required'}
        ]
      }
    const formInputTest2 = {
        name: 'Last Name',
        type: 'text',
        validators : [
          {type: 'required'}
        ]
      }
    
    this.config = new BossyFormConfig(
      [
        new BossyFormElementConfig(formInputTest1),
        new BossyFormElementConfig(formInputTest2)
      ],
        false,
        'http://localhost:3000/api/addresses',
        'http://localhost:3000/api/addresses'
    );

  }

}
