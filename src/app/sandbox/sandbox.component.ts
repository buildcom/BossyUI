import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../config.service';
import {BossyCalendarConfig} from '../../bossy-ui/components/calendar/calendar.config';
import {BossyCalendarComponent} from '../../bossy-ui/components/calendar/calendar.component';
import {BossyFormElementConfig} from '../../bossy-ui/components/form-element/form-element.config';
import {BossyFormElementComponent} from '../../bossy-ui/components/form-element/form-element.component';
import {BossyFormConfig} from '../../bossy-ui/components/form/form.config';
import {BossyFormComponent} from '../../bossy-ui/components/form/form.component';
import {BossyFormLabelConfig} from '../../bossy-ui/components/form-label/form-label.config';
import {BossyFormRadioComponent} from '../../bossy-ui/components/form-radio/form-radio.component';
import {BossyFormRadioConfig} from '../../bossy-ui/components/form-radio/form-radio.config';
import {BossyDropdownComponent} from '../../bossy-ui/components/dropdown/dropdown.component';
import {BossyDropdownConfig} from '../../bossy-ui/components/dropdown/dropdown.config';
import {BossyDropdownMenuItemComponent} from '../../bossy-ui/components/dropdown-menu/dropdown-menu.component';
import {BossyDropdownMenuConfig} from '../../bossy-ui/components/dropdown-menu/dropdown-menu.config';
import {BossyFormSelectMenuComponent} from '../../bossy-ui/components/form-selectmenu/form-selectmenu.component';
import {BossyFormSelectMenuConfig} from '../../bossy-ui/components/form-selectmenu/form-selectmenu.config';
import {BossyFormTextareaComponent} from '../../bossy-ui/components/form-textarea/form-textarea.component';
import {BossyFormTextareaConfig} from '../../bossy-ui/components/form-textarea/form-textarea.config';
import {BossyPopoverComponent} from '../../bossy-ui/components/popover/popover.component';
import {BossyPopoverConfig} from '../../bossy-ui/components/popover/popover.config';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

// components: Array<any> = Components;
  bossyCalendar = BossyCalendarComponent;
  bossyForm = BossyFormComponent;
  bossyFormRadio = BossyFormRadioComponent;
  bossyDropdown = BossyDropdownComponent;
  bossyDropdownMenuItem = BossyDropdownMenuItemComponent;
  bossyFormElement = BossyFormElementComponent;
  bossyFormSelectMenu = BossyFormSelectMenuComponent;
  bossyFormTextarea = BossyFormTextareaComponent;
  BossyPopover = BossyPopoverComponent;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    const calendarConfig = new BossyCalendarConfig();
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
      },
      formInput2 = {
        name: 'textareaInput',
        type: 'textarea',
        status: 'none',
        value: 'test value for textarea',
        rows: 5,
        cols: 10
      },
      formInput3 = {
        name: 'emailInput',
        type: 'email',
        status: 'none',
        value: 'test value for email'
      },
      // Thing that seems to serve no apparent purpose other than to indicate that it is possible to create this.
      formInput4 = {
        name: 'Input',
        type: 'text'
      },
      formInput5 = {
        name: 'selectmenu',
        type: 'selectmenu',
        selectmenu: new BossyFormSelectMenuConfig({
          title: 'Vegetables',
          items:
            [
              {value: 'carrot'},
              {value: 'celery', isDisabled: true},
              {value: 'potato'}
            ]
        })
      },
      formInput6 = {
        name: 'radio',
        type: 'radio',
        label: new BossyFormLabelConfig('Test label for radio button'),
        radio: new BossyFormRadioConfig({
          componentId: 'myRadio',
          items: [
            {value: 'Option 1'},
            {value: 'Option 2'},
            {value: 'Option 3', isDisabled: true}
          ]
        })
      },
      textareaInput1 = {
        name: 'textareaInput',
        status: 'none',
        type: 'textarea',
        label: 'Comments',
        rows: 5,
        placeholder: 'Put your comment here'
      };

    const formConfig = new BossyFormConfig(
      [
        new BossyFormElementConfig(formInput1),
        new BossyFormElementConfig(formInput2),
        new BossyFormElementConfig(formInput3),
        new BossyFormElementConfig(formInput5),
        new BossyFormElementConfig(formInput6)
      ],
        false,
        'http://localhost:3000/api/addresses',
        'http://localhost:3000/api/addresses',
    );

    // Radio component independent of form
    const bossyFormRadioConfig = new BossyFormRadioConfig({
        componentId: 'Pick Star Wars',
        items: [
          {value: 'The Neon Demon', isDisabled: true},
          {value: 'Star Wars Episode VI: Return of the Jedi', isDisabled: false},
          {value: 'Silence of the Lambs', isDisabled: true},
          {value: 'Twilight', isDisabled: true}
        ]
      }
    );
    const formElementConfig = new BossyFormElementConfig(formInput4);
    const dropdownConfig = new BossyDropdownConfig('Dropdown Menu', 'button',
      [
        new BossyDropdownMenuConfig('button', 'Item 1', '#', false),
        new BossyDropdownMenuConfig('button', 'Item 2'),
        new BossyDropdownMenuConfig('button', 'Item 3')
      ],
      false, 'large', undefined, false, 'primary');

    const selectMenuConfig = new BossyFormSelectMenuConfig({
        title: 'State',
        items:
          [
            {value: 'California'},
            {value: 'Nevada', isDisabled: true},
            {value: 'Oregon'}
          ]
      }
    );
    const bossyFormTextareaConfig = new BossyFormTextareaConfig(textareaInput1);

    this.configService.setConfig('calendarConfig', calendarConfig);
    this.configService.setConfig('formConfig', formConfig);
    this.configService.setConfig('formElementConfig', formElementConfig);
    this.configService.setConfig('bossyFormRadioConfig', bossyFormRadioConfig);
    this.configService.setConfig('dropdownConfig', dropdownConfig);
    this.configService.setConfig('selectMenuConfig', selectMenuConfig);
    this.configService.setConfig('bossyFormTextareaConfig', bossyFormTextareaConfig);
  }

}
