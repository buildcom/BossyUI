import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SandboxComponent} from './sandbox/sandbox.component';
import {NavigationComponent} from './navigation/navigation.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ConfigComponent} from './config/config.component';
import {BossyModule} from '../bossy-ui/bossy-ui.module';
import {ConfigService} from './config.service';
import { RouterModule, Routes } from '@angular/router';
import { ContributingComponent } from './contributing/contributing.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormComponent} from './form/form.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sandbox', component: SandboxComponent },
  { path: 'contributing', component: ContributingComponent},
  { path: 'form', component: FormComponent}
];

@NgModule({
  declarations: [
    ConfigComponent,
    AppComponent,
    SandboxComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    ContributingComponent,
    HomeComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    BossyModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
