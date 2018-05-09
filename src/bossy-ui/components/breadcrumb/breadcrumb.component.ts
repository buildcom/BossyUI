import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { BossyBreadcrumbConfig } from './breadcrumb.config';
import { Console } from '@angular/core/src/console';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'bossy-breadcrumb',
  templateUrl: './breadcrumb.html'
})


export class BossyBreadcrumbComponent implements OnInit {
  @Input() config: BossyBreadcrumbConfig;
  currentLocation: string = location.href;
  currentPath: string = location.pathname;
  deactiveItems: Array<any> = [];
  activeItem: any;

  ngOnInit() {
      this.config.items.forEach(item => {
          if (item.href === this.currentLocation || item.href === this.currentPath) {
              this.activeItem = item;
        } else {
            this.deactiveItems.push(item);
        }
      });
  }
}
