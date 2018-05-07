import {Component, Input, OnInit, SimpleChanges, HostListener} from '@angular/core';
import {BossyCarouselConfig, CarouselImage} from './carousel.config';

@Component({
  selector: 'bossy-carousel',
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css'],
})

export class BossyCarouselComponent implements OnInit {
  @Input() config: BossyCarouselConfig;
  show = false;
  isJustified = false;
  hasCaptions = false;
  goLeft = false;
  goRight = false;
  index = 0;
  numSlides = 0;
  images: Array<CarouselImage>;

  clickPrev() {
    this.goLeft = true;
    this.images.forEach((tab, index) => {
      tab.active = false;
    });
    this.images[this.index].active = !this.images[this.index].active;
      if (this.index >= 1) {
          this.index--;
      } else {
        this.index = this.numSlides - 1;
    }
    this.images[this.index].active = !this.images[this.index].active;
    this.goLeft = false;

  }

  clickNext() {
    this.goRight = true;
    this.images[this.index].active = !this.images[this.index].active;
    if (this.index <= this.numSlides - 2) {
        this.index++;
    } else {
        this.index = 0;
    }
    this.images[this.index].active = !this.images[this.index].active;
    this.goRight = false;
  }

  ngOnInit() {
     this.images = this.config.items;
     this.isJustified = true;
     this.hasCaptions = this.config.captions;
     this.numSlides = this.images.length;
  }
}

