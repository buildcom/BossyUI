import {Component, Input, OnInit} from '@angular/core';
import {BossyPaginationConfig} from './pagination.config';


@Component({
  selector: 'bossy-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],

})


export class BossyPaginationComponent implements OnInit {
  @Input() config: BossyPaginationConfig;

  disabled = true;
  size = '';
  alignment = '';

  ngOnInit() {
    /**/ 
    switch (this.config.size) {
      case 'small':
        this.size = 'pagination-sm';
        break;
      case 'large':
        this.size = 'pagination-lg';
        break;
    }


    switch (this.config.alignment) {
      case 'center':
        this.alignment = 'justify-content-center';
        break;
      case 'end':
        this.alignment = 'justify-content-end';
        break;
    }
    /**/
  }
}