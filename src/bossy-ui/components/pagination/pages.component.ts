import {Component, Input, OnInit} from '@angular/core';
import {BossyPagesConfig} from './pages.config';


@Component({
  selector: 'bossy-pagination-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],

})


export class BossyPagesComponent implements OnInit {
  @Input() config: BossyPagesConfig;

  disabledTag = '';
  activeTag = '';
  ngOnInit() {
      if (this.config.isDisabled) {
       this.disabledTag = 'disabled';
      }

      if (this.config.isActive) {
        this.activeTag = 'active';
      }
  }
}
