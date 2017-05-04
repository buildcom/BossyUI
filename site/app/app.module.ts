import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {DynamicComponent} from './dynamic.component';
import {ConfigComponent} from './config.component';
import {BossyModule} from '../../dist/index';


@NgModule({
	imports: [
		ReactiveFormsModule,
		BrowserModule,
		BossyModule
	],
	declarations: [
		AppComponent,
		DynamicComponent,
		ConfigComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
