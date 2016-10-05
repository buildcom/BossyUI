import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BossyCalendar }  from './components/calendar';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        BossyCalendar
    ],
    exports: [
        BossyCalendar
    ]
})
export class BossyModule {
    static forRoot() {
        return {
            ngModule: BossyModule,
            providers: []
        };
    }
}