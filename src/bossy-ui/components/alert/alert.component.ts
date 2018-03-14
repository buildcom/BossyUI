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
  small = true;
  medium = false;
  large = false;

  setSize(){
      if(this.config.size == 'small'){
        this.small = true;
        this.medium = false;
        this.large = false;
        }
      else if(this.config.size == 'large'){
        this.large = true;
        this.small = false;
        this.medium = false;
      }
      else{
        this.medium = true;
        this.small = false;
        this.large = false;
      }

  }

  dismissHandler(){
      this.dataDismiss = !this.dataDismiss;
  }

  ngOnInit() {
      this.setSize();
  }
}
