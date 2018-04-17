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
import {BossyCollapseConfig} from '../../bossy-ui/components/collapse/collapse.config';
import {BossyCollapseComponent} from '../../bossy-ui/components/collapse/collapse.component';
import {BossyPopoverComponent} from '../../bossy-ui/components/popover/popover.component';
import {BossyPopoverConfig} from '../../bossy-ui/components/popover/popover.config';
import {Validators} from '@angular/forms';
import { BossyAlertComponent } from '../../bossy-ui/components/alert/alert.component';
import { BossyAlertConfig, alertType, alertSize } from '../../bossy-ui/components/alert/alert.config';
import { BossyModalComponent } from '../../bossy-ui/components/modal/modal.component';
import { BossyModalConfig, modalSize } from '../../bossy-ui/components/modal/modal.config';
import { BossyNavsComponent } from '../../bossy-ui/components/navs/navs.component';
import { BossyNavsConfig, navsAlignment, navsType } from '../../bossy-ui/components/navs/navs.config';
import { BossyCarouselComponent } from '../../bossy-ui/components/carousel/carousel.component';
import { BossyCarouselConfig } from '../../bossy-ui/components/carousel/carousel.config';


@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

// components: Array<any> = Components;
  bossyModal = BossyModalComponent;
  bossyAlert = BossyAlertComponent;
  bossyCalendar = BossyCalendarComponent;
  bossyForm = BossyFormComponent;
  bossyFormRadio = BossyFormRadioComponent;
  bossyDropdown = BossyDropdownComponent;
  bossyDropdownMenuItem = BossyDropdownMenuItemComponent;
  bossyFormElement = BossyFormElementComponent;
  bossyFormSelectMenu = BossyFormSelectMenuComponent;
  bossyFormTextarea = BossyFormTextareaComponent;
  bossyCollapse = BossyCollapseComponent;
  bossyPopover = BossyPopoverComponent;
  bossyNavs = BossyNavsComponent;
  bossyCarousel = BossyCarouselComponent;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    const carouselConfig = new BossyCarouselConfig(true, true, false);
    const navsConfig = new BossyNavsConfig('link1', 'link2', 'link3', 'link4', true, navsAlignment.left, navsType.base);
    const modalConfig = new BossyModalConfig('launch', 'Title', 'Body', 'Save Changes', 'Close', false, modalSize.medium);
    const alertConfig = new BossyAlertConfig('insertHeader', 'insertMainText', 'insertExtraText', alertType.danger, alertSize.small);
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
    const dropdownConfig = new BossyDropdownConfig('Dropdown Menu',
      [
        new BossyDropdownMenuConfig('Item 1'),
        new BossyDropdownMenuConfig('Item 2'),
        new BossyDropdownMenuConfig('Item 3')
      ]);

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
    const bossyPopoverConfig = new BossyPopoverConfig('popover', 'popover1234', true, 'right', 'PoverOver Title', 'Popover Description');

    const bossyCollapseConfig = new BossyCollapseConfig([
        {name: 'button1' , data: 'example1'}
    ], true);

    this.configService.setConfig('modalConfig', modalConfig);
    this.configService.setConfig('alertConfig', alertConfig);
    this.configService.setConfig('calendarConfig', calendarConfig);
    this.configService.setConfig('formConfig', formConfig);
    this.configService.setConfig('formElementConfig', formElementConfig);
    this.configService.setConfig('bossyFormRadioConfig', bossyFormRadioConfig);
    this.configService.setConfig('dropdownConfig', dropdownConfig);
    this.configService.setConfig('selectMenuConfig', selectMenuConfig);
    this.configService.setConfig('bossyFormTextareaConfig', bossyFormTextareaConfig);
    this.configService.setConfig('bossyCollapseConfig', bossyCollapseConfig);
    this.configService.setConfig('bossyPopoverConfig', bossyPopoverConfig);
    this.configService.setConfig('navsConfig', navsConfig);
    this.configService.setConfig('carouselConfig', carouselConfig);
  }

}
