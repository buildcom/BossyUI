import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyAlertConfig} from './alert.config';

@Component({
  selector: 'bossy-alert',
  templateUrl: './alert.html',
  styleUrls: ['./alert.css'],
})

export class BossyAlertComponent implements OnInit {
  @Input() config: BossyAlertConfig;
  dataDismiss = true;

  dismissHandler(){
      this.dataDismiss= !this.dataDismiss;
  }

  ngOnInit() {
  }
}
