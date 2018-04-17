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
  isJustified; isRight; isVertical; isCenter; isBase = false;
  navsAlignment; navsType: string;

  ngOnInit() {
     this.isJustified = true;
  }
}

const images: Image[] = [
    { "title": "Image 1", "url": "" },
    { "title": "Image 2", "url": "" },
    { "title": "Image 3", "url": "" }
  ];