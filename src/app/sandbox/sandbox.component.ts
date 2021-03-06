import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../config.service';
import { BossyBreadcrumbConfig } from '../../bossy-ui/components/breadcrumb/breadcrumb.config';
import { BossyCalendarConfig } from '../../bossy-ui/components/calendar/calendar.config';
import { BossyFormElementConfig } from '../../bossy-ui/components/form-element/form-element.config';
import { BossyFormConfig } from '../../bossy-ui/components/form/form.config';
import { BossyFormLabelConfig } from '../../bossy-ui/components/form-label/form-label.config';
import { BossyFormRadioConfig } from '../../bossy-ui/components/form-radio/form-radio.config';
import { BossyDropdownConfig } from '../../bossy-ui/components/dropdown/dropdown.config';
import { BossyDropdownMenuConfig } from '../../bossy-ui/components/dropdown-menu/dropdown-menu.config';
import { BossyFormSelectMenuConfig } from '../../bossy-ui/components/form-selectmenu/form-selectmenu.config';
import { BossyFormTextareaConfig } from '../../bossy-ui/components/form-textarea/form-textarea.config';
import { BossyCollapseConfig } from '../../bossy-ui/components/collapse/collapse.config';
import { BossyPopoverConfig } from '../../bossy-ui/components/popover/popover.config';
import { BossyAlertConfig, alertType, alertSize } from '../../bossy-ui/components/alert/alert.config';
import { BossyModalConfig, modalSize } from '../../bossy-ui/components/modal/modal.config';
import { BossyButtonConfig } from '../../bossy-ui/components/button/button.config';
import { BossyNavsComponent } from '../../bossy-ui/components/navs/navs.component';
import { BossyNavsConfig, navsAlignment, navsType, NavItem, navsActive } from '../../bossy-ui/components/navs/navs.config';
import { BossyCarouselComponent } from '../../bossy-ui/components/carousel/carousel.component';
import { BossyCarouselConfig, CarouselImage } from '../../bossy-ui/components/carousel/carousel.config';
import {BossyPaginationConfig} from '../../bossy-ui/components/pagination/pagination.config';
import { BossyNavBarComponent } from '../../bossy-ui/components/nav-bar/nav-bar.component';
import {
  BossyNavBarConfig,
  navBarAlignment,
  navBarStyle,
  navBarColor,
  NavBarItem,
  navBarActive } from '../../bossy-ui/components/nav-bar/nav-bar.config';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {
  constructor(public configService: ConfigService) {
  }

  ngOnInit() {
    const navBarItem = [{'name': 'nav 1', 'active': navBarActive.active}, {'name': 'nav 2', 'active': navBarActive.none},
    {'name': 'nav 3', 'active': navBarActive.disabled}, {'name': 'nav 4', 'active': navBarActive.disabled}];
    const navBarConfig = new BossyNavBarConfig(navBarItem, true, navBarAlignment.default, navBarStyle.dark, navBarColor.info);
    const carouselItems = [
      {
        'title': 'First',
        'active': true,
        'url': 'http://www.dem.ri.gov/programs/water/sustainablewatersheds/images/slideshow/crab3-800x400.jpg'
      },
      {
        'title': 'Second',
        'active': false,
        'url': 'http://jackson-assoc.leapwp.com.au/wp-content/uploads/sites/1199/2016/04/40569158_ml-800x400.jpg'
      },
      {
        'title': 'Third',
        'active': false,
        'url': 'http://pigios-svetaines.eu/projects/glance-uikit/data/uploads/images/slides/slideshow_800x400_2.jpg'
      }
    ];
    const carouselConfig = new BossyCarouselConfig(carouselItems, true, true, false);
    const navsItem = [{ 'name': 'nav 1', 'active': navsActive.none }, { 'name': 'nav 2', 'active': navsActive.active },
    { 'name': 'nav 3', 'active': navsActive.disabled }];
    const navsConfig = new BossyNavsConfig(navsItem, true, true, navsAlignment.vertical, navsType.pills);
    const modalConfig = new BossyModalConfig('launch', 'Title', 'Body', 'Save Changes', 'Close', false, modalSize.medium);
    const alertConfig = new BossyAlertConfig('insertHeader', 'insertMainText', 'insertExtraText', alertType.danger, alertSize.small);
    const calendarConfig = new BossyCalendarConfig();
    const formInput1 = {
      name: 'textInput',
      type: 'text',
      status: 'none',
      value: 'test value for text',
      label: new BossyFormLabelConfig('text label test', true),
      validators: [
        { type: 'required' },
        { type: 'minLength', value: 8 }
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
              { value: 'carrot' },
              { value: 'celery', isDisabled: true },
              { value: 'potato' }
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
            { value: 'Option 1' },
            { value: 'Option 2' },
            { value: 'Option 3', isDisabled: true }
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
        { value: 'The Neon Demon', isDisabled: true },
        { value: 'Star Wars Episode VI: Return of the Jedi', isDisabled: false },
        { value: 'Silence of the Lambs', isDisabled: true },
        { value: 'Twilight', isDisabled: true }
      ]
    }
    );
    const formElementConfig = new BossyFormElementConfig(formInput4);
    const dropdownConfig = new BossyDropdownConfig('Dropdown Menu',
      'primary',
      [
        new BossyDropdownMenuConfig('Header', 'header'),
        new BossyDropdownMenuConfig('Item 1', 'default', undefined, undefined, '#'),
        new BossyDropdownMenuConfig('Div', 'divider'),
        new BossyDropdownMenuConfig('Item 2', 'default'),
        new BossyDropdownMenuConfig('Item 3', 'default', true),
        new BossyDropdownMenuConfig('Item 4', 'default', undefined, true, '#')
      ],
      '',
      '',
      true
    );

    const buttonConfig = new BossyButtonConfig('Button', 'primary', '', false, false, false);

    const selectMenuConfig = new BossyFormSelectMenuConfig({
      title: 'State',
      items:
        [
          { value: 'California' },
          { value: 'Nevada', isDisabled: true },
          { value: 'Oregon' }
        ]
    }
    );
    const bossyFormTextareaConfig = new BossyFormTextareaConfig(textareaInput1);
    const bossyPopoverConfig = new BossyPopoverConfig('popover', 'popover1234', true, 'right', 'PoverOver Title', 'Popover Description');

    const bossyPaginationConfig = new BossyPaginationConfig('pagination', '', '', [
      { value: 'Previous', href: '#', isActive: false, isDisabled: false },
      { value: '1', href: '#', isActive: true, isDisabled: false },
      { value: '2', href: '#', isActive: false, isDisabled: false },
      { value: '3', href: '#', isActive: false, isDisabled: true },
      { value: 'Next', href: '#', isActive: false, isDisabled: false },
    ]);
    const bossyCollapseConfig = new BossyCollapseConfig([
      { name: 'button1', data: 'example1' }
    ], true);

    const bossyBreadcrumbConfig = new BossyBreadcrumbConfig([
      { name: 'home', href: 'http://localhost:4200' },
      { name: 'sandbox', href: '/sandbox' },
    ]);

    this.configService.setConfig('bossyBreadcrumbConfig', bossyBreadcrumbConfig);
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
    this.configService.setConfig('buttonConfig', buttonConfig);
    this.configService.setConfig('navsConfig', navsConfig);
    this.configService.setConfig('carouselConfig', carouselConfig);
    this.configService.setConfig('bossyPaginationConfig', bossyPaginationConfig);
    this.configService.setConfig('navBarConfig', navBarConfig);
  }
}


