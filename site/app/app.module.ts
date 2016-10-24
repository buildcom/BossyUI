import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config.component';
import { BossyModule } from '../../dist/bossy';


@NgModule({
    imports: [
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