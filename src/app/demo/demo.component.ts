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
import { BossyPaginationConfig } from '../../bossy-ui/components/pagination/pagination.config';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
