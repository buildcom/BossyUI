import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyNavsConfig, NavItem} from './navs.config';

@Component({
  selector: 'bossy-navs',
  templateUrl: './navs.html',
  styleUrls: ['./navs.css'],
})

export class BossyNavsComponent implements OnInit {
  @Input() config: BossyNavsConfig;
  navsAlign: string;
  navsType: string;
  navsItems: Array<NavItem>;
  navsStatus: Array<boolean>;

  click1(){
    this.navsStatus[0] = true;
    this.navsStatus[1] = false;
    this.navsStatus[2] = false;
  }
  click2(){
    this.navsStatus[0] = false;
    this.navsStatus[1] = true;
    this.navsStatus[2] = false;
  }
  click3(){
    this.navsStatus[0] = false;
    this.navsStatus[1] = false;
    this.navsStatus[2] = true;
  }


  ngOnInit() {
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
