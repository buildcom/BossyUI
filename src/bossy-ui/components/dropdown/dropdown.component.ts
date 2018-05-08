import { Component, Input, OnInit, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BossyDropdownConfig } from './dropdown.config';

@Component({
  selector: 'bossy-dropdown',
  templateUrl: './dropdown.html',
})

export class BossyDropdownComponent implements OnInit, AfterViewInit {
  @Input() config: BossyDropdownConfig;
  @ViewChild('popper') popper: ElementRef;
  @ViewChild('referenceObject') reference: ElementRef;
  showMenu = false;
  ariaExpanded = false;
  btnSize = '';
  btnDir = '';
  btnShow = '';
  dropdownMenu;

  showMenuOnClick() {
    this.showMenu = !this.showMenu;
    this.ariaExpanded = !this.ariaExpanded;

    if (this.showMenu === true) {
      this.btnShow = 'show';
    } else {
      this.btnShow = undefined;
    }
  }

  ngOnInit() {
    if (this.config.btnSize === 'small') {
      this.btnSize = 'btn-sm';
    } else if (this.config.btnSize === 'large') {
      this.btnSize = 'btn-lg';
    } else {
      this.btnSize = '';
    }

    if (this.config.direction === 'up') {
      this.btnDir = 'dropup';
    } else if (this.config.direction === 'down') {
      this.btnDir = 'dropdown';
    } else if (this.config.direction === 'left') {
      this.btnDir = 'dropleft';
    } else if (this.config.direction === 'right') {
      this.btnDir = 'dropright';
    } else {
      this.btnDir = 'dropdown';
    }
  }

  ngAfterViewInit() {
    this.dropdownMenu = new Popper(
      this.reference.nativeElement,
      this.popper.nativeElement,
      {
        // popper options here
      }
    );
  }
}
