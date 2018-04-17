import {Component, Input, OnInit, SimpleChanges, HostListener} from '@angular/core';
import {BossyCarouselConfig} from './carousel.config';
import {Image} from './image.interface';

@Component({
  selector: 'bossy-carousel',
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css'],
})

export class BossyCarouselComponent implements OnInit {
  @Input() config: BossyCarouselConfig;
  show = false;
  isJustified; hasCaptions = false;
  index = 0;
  numSlides = 3;

  images: Image[] = [
    { 'title': 'First',
      'active': true,
      'url': 'http://www.dem.ri.gov/programs/water/sustainablewatersheds/images/slideshow/crab3-800x400.jpg' },
    { 'title': 'Second',
      'active': false,
      'url': 'http://jackson-assoc.leapwp.com.au/wp-content/uploads/sites/1199/2016/04/40569158_ml-800x400.jpg' },
    { 'title': 'Third',
      'active': false,
      'url': 'http://pigios-svetaines.eu/projects/glance-uikit/data/uploads/images/slides/slideshow_800x400_2.jpg' }
  ];

  clickPrev() {
    this.images[this.index].active = !this.images[this.index].active;
      if (this.index >= 1) {
          this.index--;
      } else {
        this.index = this.numSlides - 1;
    }
    this.images[this.index].active = !this.images[this.index].active;

  }

  clickNext() {
    this.images[this.index].active = !this.images[this.index].active;
    if (this.index <= this.numSlides - 2) {
        this.index++;
    } else {
        this.index = 0;
    }
    this.images[this.index].active = !this.images[this.index].active;

  }

  ngOnInit() {
     this.isJustified = true;
     this.hasCaptions = this.config.captions;
     this.images = this.images;
  }
}

