import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {BossyModalConfig} from './modal.config';
import {FormControl, FormGroup, Validators, NgModel} from '@angular/forms';

@Component({
  selector: 'bossy-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})

export class BossyModalComponent implements OnInit {
  @Input() config: BossyModalConfig;
  show; show2; show3; showPop = false;
  isCentered = false;
  myForm: FormGroup;

  clickHandler(){
    this.show = !this.show;
  }

  clickHandler2(){
    this.show2 = !this.show2;
  }

  clickHandler3(){
    this.show3 = !this.show3;
  }

  clickHandlerPopover(){
    this.showPop = !this.showPop;
  }

  ngOnInit() {
     this.isCentered = this.config.isCentered;
     this.myForm = new FormGroup({
      Recipient: new FormControl('', [<any>Validators.required]),
      Message: new FormControl('', [<any>Validators.required])
 
  });
  }
}
