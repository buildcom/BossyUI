import {Component, Input, OnInit, SimpleChanges, HostListener} from '@angular/core';
import {BossyNavsConfig} from './navs.config';

@Component({
  selector: 'bossy-navs',
  templateUrl: './navs.html',
  styleUrls: ['./navs.css'],
})

export class BossyNavsComponent implements OnInit {
  @Input() config: BossyNavsConfig;
  show = false;
  isJustified; isRight; isVertical; isCenter; isBase = false;
  navsAlignment; navsType: string;

  ngOnInit() {
     this.isJustified = this.config.isJustified;
      switch (this.config.alignment) {
          case 'right': {
            this.navsAlignment = 'justify-content-end';
            break;
          }
          case 'left': {
            this.navsAlignment = '';
            break;
          }
          case 'center': {
            this.navsAlignment = 'justify-content-center';
            break;
          }
          case 'vertical': {
            this.navsAlignment = 'flex-column';
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
