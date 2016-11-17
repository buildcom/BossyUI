import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TextArea }      from './text-area.component'

@NgModule ({
  imports: [BrowserModule],
  declarations: [TextArea],
  bootstrap: [TextArea]
})
export class TextAreaModule {}
