import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyModalConfig} from './modal.config';

@Component({
  selector: 'bossy-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})

export class BossyModalComponent implements OnInit {
  @Input() config: BossyModalConfig;
  show = false;
 

  clickHandler(){
    this.show = !this.show;
  }

  ngOnInit() {
     
  }
}
