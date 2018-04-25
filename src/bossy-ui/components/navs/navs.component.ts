import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyNavsConfig} from './navs.config';

@Component({
  selector: 'bossy-navs',
  templateUrl: './navs.html',
  styleUrls: ['./navs.css'],
})

export class BossyNavsComponent implements OnInit {
  @Input() config: BossyNavsConfig;
  navsAlign: string;
  myNavsType: string;

  ngOnInit() {
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
              this.myNavsType = '';
              break;
          }
          case 'pills': {
            this.myNavsType = 'nav-pills';
            break;
        }
        case 'tabs': {
            this.myNavsType = 'nav-tabs';
            break;
        }
      }
  }
}
