import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, NgModel} from '@angular/forms';
import {BossyFormTextareaConfig} from '../../config/bossy-form-textarea';
import {PosterService} from '../../../app/poster.service';

@Component({
  selector: 'bossy-form-textarea',
  templateUrl: './form-textarea.html',
  styleUrls: ['./form-textarea.css'],
})
export class BossyFormTextareaComponent implements OnInit {
  @Input() config: BossyFormTextareaConfig;
  value = '';
  status = 'none';
  textFormControl = new FormControl();
  
  constructor(private posterService: PosterService) {
  }

  ngOnInit() {
    const {name, value, formGroup} = this.config;
  }

  
  posterer(): void {
    let input = { emailInput: {value: this.textFormControl.value }};
    console.log(this.textFormControl.value);
    console.log(this.config.targetURL);
    console.log(JSON.stringify(input));
    this.posterService.poster({ input } as any, this.config.targetURL)
      .subscribe( res => {
        console.log(JSON.stringify(res));
      },
      err => {
        console.log("Error occured");
      });
    this.textFormControl.reset();
  }

  output() {
  }
}
