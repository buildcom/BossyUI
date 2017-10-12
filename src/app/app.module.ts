import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SandboxComponent} from './sandbox/sandbox.component';
import {NavigationComponent} from './navigation/navigation.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ConfigComponent} from './config/config.component';
import {DynamicComponent} from './dynamic/dynamic.component';
import {BossyModule} from '../bossy-ui/bossy-ui.module';
import {ConfigService} from './config.service';
import { RouterModule, Routes } from '@angular/router';
import { ContributingComponent } from './contributing/contributing.component';
import { HomeComponent } from './home/home.component';
import {BossyFormElementComponent} from '../bossy-ui/components/form-element/form-element'

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sandbox', component: SandboxComponent },
  { path: 'contributing', component: ContributingComponent },
  { path: 'element', component: BossyFormElementComponent }
];

@NgModule({
  declarations: [
    DynamicComponent,
    ConfigComponent,
    AppComponent,
    SandboxComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    ContributingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BossyModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
