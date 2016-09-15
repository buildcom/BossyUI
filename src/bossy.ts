import { NgModule }      from '@angular/core';
import { BossyCalendar }  from './components/calendar';

@NgModule({
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