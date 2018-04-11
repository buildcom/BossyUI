import {Component, Input, OnInit} from '@angular/core';
import {BossyPaginationConfig} from './pagination.config';


@Component({
  selector: 'bossy-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],

})


export class BossyPaginationComponent implements OnInit {
  @Input() config: BossyPaginationConfig;

  constructor() {}

  ngOnInit() {

  }
}