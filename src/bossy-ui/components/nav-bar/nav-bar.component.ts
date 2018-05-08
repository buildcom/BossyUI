import {
    Component,
    Input,
    OnInit,
    SimpleChanges,
    ContentChildren,
    AfterContentInit,
    QueryList
  } from '@angular/core';
  import { BossyNavBarConfig, NavBarItem, navBarActive } from './nav-bar.config';
  import { BossyNavItemComponent } from '../nav-bar/nav-item.component';
  
  @Component({
    selector: 'bossy-nav-bar',
    templateUrl: './nav-bar.html',
    styleUrls: ['./nav-bar.css']
  })
  export class BossyNavBarComponent implements OnInit, AfterContentInit {
    @Input() config: BossyNavBarConfig;
    @ContentChildren(BossyNavItemComponent) navBarItemList: QueryList<BossyNavItemComponent>;
    navBarAlign: string;
    navBarType: string;
    show: boolean;
    navBarStatus: Array<boolean>;
    navBarItems: Array<NavBarItem>;
    isVertical: boolean;
  
    toggleCollapse() {
     this.show= !this.show;
    }
  
    ngAfterContentInit() {
        this.navBarItemList.forEach((tab, index) => {
            tab.id = this.navBarItems[index].name;
            tab.isActive = (this.navBarItems[index].active === 'active' ? true : false);
          });
    }
  
    ngOnInit() {
      this.show = false;
      this.isVertical = (this.config.alignment === 'vertical' ? true : false);
      this.navBarItems = this.config.navBarItems;
        switch (this.config.alignment) {
            case 'right': {
              this.navBarAlign = 'justify-content-end';
              break;
            }
            case 'left': {
              this.navBarAlign = '';
              break;
            }
            case 'center': {
              this.navBarAlign = 'justify-content-center';
              break;
            }
            case 'vertical': {
              this.navBarAlign = 'flex-column';
              break;
            }
        }
        switch (this.config.type) {
            case 'base': {
                this.navBarType = '';
                break;
            }
            case 'pills': {
              this.navBarType = 'nav-pills';
              break;
          }
          case 'tabs': {
              this.navBarType = 'nav-tabs';
              break;
          }
        }
    }
  }
  