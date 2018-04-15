import {Component, Input, OnInit, SimpleChanges, HostListener} from '@angular/core';
import {BossyModalConfig} from './modal.config';

@Component({
  selector: 'bossy-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})

export class BossyModalComponent implements OnInit {
  @Input() config: BossyModalConfig;
  show = false;
  isCentered; isSmall; isMedium; isLarge = false;
  sizeModal; displayModal: string;

  @HostListener('window:keyup' , ['$event'])
  keyboardInput(event: KeyboardEvent) {
      if (event.keyCode === 27 && this.show) {
        this.clickHandler();
      }
  }

  @HostListener('document:click' , ['$event'])
  clickOutside(event: MouseEvent) {
  const element = event.target as HTMLElement;
  if (element.classList.contains('modal')) {
    this.clickHandler();
  }
  }

  clickHandler() {
    this.show = !this.show;
  }

  ngOnInit() {
     this.isCentered = this.config.isCentered;
      if (this.config.size === 'small') {
        this.isSmall = true;
        this.sizeModal = 'modal-sm';
        } else if (this.config.size === 'large') {
        this.isLarge = true;
        this.sizeModal = 'modal-lg';
      } else {
        this.isMedium = true;
        this.sizeModal = '';
      }
  }
}
