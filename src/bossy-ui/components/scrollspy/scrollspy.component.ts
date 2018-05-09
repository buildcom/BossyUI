import {
    Component,
    HostListener,
    Input,
    OnInit,
    SimpleChanges,
    ContentChildren,
    AfterContentInit,
    AfterViewInit,
    QueryList
  } from '@angular/core';
  import { BossyScrollspyConfig,scrollspyType, ScrollspyItem } from './scrollspy.config';
  import { BossyScrollspyItemComponent } from './scrollspy-item.component';
  
  
  @Component({
    selector: 'bossy-scrollspy',
    templateUrl: './scrollspy.html',
    styleUrls: ['./scrollspy.css']
  })
  export class BossyScrollspyComponent implements OnInit, AfterContentInit {
    @Input() config: BossyScrollspyConfig;
    @ContentChildren(BossyScrollspyItemComponent) scrollspyContent: QueryList<BossyScrollspyItemComponent>;
    isNavActive : Array<boolean>;
    scrollspyItems : Array<ScrollspyItem>;
    @HostListener('scroll', ['$event']) 
    onScroll($event){
        console.log($event);
        console.log('scrolling');
    }
  
  
    ngAfterContentInit() {
        let scrollContents: BossyScrollspyItemComponent[] = this.scrollspyItems;
        this.scrollspyContent.forEach((tab, index) => {
            tab.id = this.scrollspyItems[index].id;
          });
    }
  
    ngOnInit() {
      this.scrollspyItems = this.config.scrollspyItems;
      this.isNavActive = this.scrollspyItems.map((item) => {
        return item.id === this.scrollspyItems[0].id;
      });
    }
  }
  