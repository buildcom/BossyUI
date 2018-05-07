import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ContentChildren,
  AfterContentInit,
  QueryList
} from '@angular/core';
import { BossyNavsConfig, NavItem, navsActive } from './navs.config';
import { BossyNavTabComponent } from './nav-tab.component';

@Component({
  selector: 'bossy-navs',
  templateUrl: './navs.html',
  styleUrls: ['./navs.css']
})
export class BossyNavsComponent implements OnInit, AfterContentInit {
  @Input() config: BossyNavsConfig;
  @ContentChildren(BossyNavTabComponent) navTabs: QueryList<BossyNavTabComponent>;
  navsAlign: string;
  navsType: string;
  navsItems: Array<NavItem>;
  navsStatus: Array<boolean>;
  isVertical: boolean;

  unSelect() {
    this.navTabs.forEach((tab, index) => {
      tab.isActive = false;
    });
  }

  tabSelect(navsItem) {
    this.navsItems.forEach((tab) => {
      tab.active = navsActive.none;
    });
    navsItem.active = 'active';
    this.navsStatus = this.navsItems.map((item) => {
      return item.active === 'active';
    });
    this.navTabs.forEach((tab, index) => {
      tab.isActive = this.navsStatus[index];
      tab.tabSelect = () => {
        this.unSelect();
        tab.isActive = true;
      };
    });
  }

  ngAfterContentInit() {
    this.navTabs.forEach((tab, index) => {
      tab.id = 'nav-${index}';
      tab.isActive = this.navsStatus[index];
      tab.tabSelect = () => {
        this.unSelect();
        tab.isActive = true;
      };
    });
  }

  ngOnInit() {
    this.isVertical = (this.config.alignment === 'vertical' ? true : false);
    this.navsItems = this.config.navItems;
    this.navsStatus = this.navsItems.map((item) => {
      return item.active === 'active';
    });
      switch (this.config.alignment) {
          case 'right': {
            this.navsAlign = 'justify-content-end';
            break;
          }
          case 'left': {
            this.navsAlign = '';
            break;
          }
          case 'center': {
            this.navsAlign = 'justify-content-center';
            break;
          }
          case 'vertical': {
            this.navsAlign = 'flex-column';
            break;
          }
      }
      switch (this.config.type) {
          case 'base': {
              this.navsType = '';
              break;
          }
          case 'pills': {
            this.navsType = 'nav-pills';
            break;
        }
        case 'tabs': {
            this.navsType = 'nav-tabs';
            break;
        }
      }
  }
}
