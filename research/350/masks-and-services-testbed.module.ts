import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {ToSSN} from './to-ssn.pipe';
import { MasksAndServicesTestbed }      from './masks-and-services-testbed.component';
import {FormsModule} from "@angular/forms";

@NgModule ({
  imports: [BrowserModule, FormsModule],
  declarations: [MasksAndServicesTestbed, ToSSN],
  bootstrap: [MasksAndServicesTestbed],
})
export class MasksAndServicesTestbedModule {
}
