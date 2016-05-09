export declare class BossyCalendarOptions {
    date: Date;
    constructor();
}
export declare class BossyCalendar {
    config: any;
    dateMap: Array<any>;
    days: Array<string>;
    options: BossyCalendarOptions;
    display: Date;
    selected: Date;
    constructor();
    ngOnInit(): void;
    previousMonth(): void;
    nextMonth(): void;
    selectMonth(month: any): void;
    selectDate(date: any): void;
    updateDateMap(): void;
}
