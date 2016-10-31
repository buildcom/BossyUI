import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config.component';
import { BossyModule } from '../../dist/bossy';


@NgModule({
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        BossyModule
    ],
    declarations: [
        AppComponent,
        ConfigComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }