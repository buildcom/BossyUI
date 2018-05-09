import {
    Component,
    Input,
    OnInit,
    SimpleChanges
  } from '@angular/core';
  import { BossyNavBarConfig, NavBarItem, navBarActive } from './nav-bar.config';

  @Component({
    selector: 'bossy-nav-bar',
    templateUrl: './nav-bar.html',
    styleUrls: ['./nav-bar.css']
  })
  export class BossyNavBarComponent implements OnInit {
    @Input() config: BossyNavBarConfig;
    navBarAlignment: string;
    navBarStyle: string;
    navBarColor: string;
    show: boolean;
    isCollapseable: boolean;
    navBarItems: Array<NavBarItem>;

    toggleCollapse() {
     this.show = !this.show;
    }

    ngOnInit() {
      this.show = false;
      this.isCollapseable = this.config.isCollapseable;
      this.navBarItems = this.config.navBarItems;
      this.navBarStyle = 'navbar-' + this.config.style;
      this.navBarColor = 'bg-' + this.config.color;
        switch (this.config.alignment) {
            case 'default': {
              this.navBarAlignment = '';
              break;
            }
            case 'top': {
              this.navBarAlignment = 'fixed-top';
              break;
            }
            case 'bottom': {
              this.navBarAlignment = 'fixed-bottom';
              break;
            }
            case 'sticky': {
              this.navBarAlignment = 'sticky-top';
              break;
            }
        }
    }
  }
