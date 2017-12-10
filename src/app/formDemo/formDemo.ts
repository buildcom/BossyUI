import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../config.service';
import {BossyCalendarConfig} from '../../bossy-ui/config/calendar';
import {BossyCalendarComponent} from '../../bossy-ui/components/calendar/calendar';
import {BossyFormElementConfig} from '../../bossy-ui/config/form-element';
import {BossyFormElementComponent} from '../../bossy-ui/components/form-element/form-element';
import {BossyFormConfig} from '../../bossy-ui/config/form';
import {BossyFormComponent} from '../../bossy-ui/components/form/form';
import {BossyFormLabelConfig} from '../../bossy-ui/config/form-label';
import {BossyFormRadioComponent} from '../../bossy-ui/components/form-radio/form-radio';
import {BossyFormRadioConfig} from '../../bossy-ui/config/form-radio';
import {BossyDropdownComponent} from '../../bossy-ui/components/dropdown/dropdown';
import {BossyDropdownConfig} from '../../bossy-ui/config/dropdown';
import {BossyDropdownMenuItemComponent} from '../../bossy-ui/components/dropdown-menu/dropdown-menu';
import {BossyDropdownMenuItemConfig} from '../../bossy-ui/config/dropdown-menu';
import {BossyFormSelectMenuComponent} from '../../bossy-ui/components/form-selectmenu/form-selectmenu';
import {BossyFormSelectMenuConfig} from '../../bossy-ui/config/form-selectmenu';
import {BossyFormTextareaComponent} from '../../bossy-ui/components/form-textarea/form-textarea';
import {BossyFormTextareaConfig} from '../../bossy-ui/config/bossy-form-textarea';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-formDemo',
  templateUrl: './formDemo.html',
  styleUrls: ['./formDemo.css']
})
export class FormDemo implements OnInit {

  bossyDemoForm = BossyFormComponent;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {

    const formInput1 = {
      name: 'textInput',
      type: 'text',
      status: 'none',
      value: 'test value for text',
      label: new BossyFormLabelConfig('text label test', true),
      validators : [
        {type: 'required'},
        {type: 'minLength', value: 8 }
      ]
    };
    const formDemoConfig = new BossyFormConfig([
      new BossyFormElementConfig(formInput1),
    ],
        false,
        'http://localhost:3000/api/test',
        'http://localhost:3000/api/test',
    );

  this.configService.setConfig('formDemoConfig', formDemoConfig);
  }
}
