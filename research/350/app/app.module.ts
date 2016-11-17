import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { TextInput }     from './text-input.component';
import { MasksAndServicesTestbed } from './masks-and-services-testbed.component';
import { MaskService } from './mask.service';


@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, TextInput, MasksAndServicesTestbed],
  bootstrap: [ AppComponent, MasksAndServicesTestbed],
  providers: [MaskService]
})
export class AppModule {
}
