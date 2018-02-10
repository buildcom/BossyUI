import {Component, Input, OnInit} from '@angular/core';
import {BossyBootcampConfig} from './bootcamp.config';

@Component({
  selector: 'bossy-bootcamp',
  templateUrl: './bootcamp.html',
})

export class BossyBootcampComponent implements OnInit {
  @Input() config: BossyBootcampConfig;

  ngOnInit() {
  }
}
