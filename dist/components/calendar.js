System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var BossyCalendarOptions, BossyCalendar;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BossyCalendarOptions = (function () {
                function BossyCalendarOptions() {
                    this.date = new Date();
                }
                return BossyCalendarOptions;
            }());
            exports_1("BossyCalendarOptions", BossyCalendarOptions);
            BossyCalendar = (function () {
                function BossyCalendar() {
                    this.dateMap = [];
                    this.days = [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday'
                    ];
                    this.options = new BossyCalendarOptions();
                    this.display = new Date();
                    this.selected = new Date();
                }
                BossyCalendar.prototype.ngOnInit = function () {
                    console.log('calendar test', this.config);
                    this.updateDateMap();
                };
                BossyCalendar.prototype.previousMonth = function () {
                    this.selectMonth(this.display.getMonth() - 1);
                };
                BossyCalendar.prototype.nextMonth = function () {
                    this.selectMonth(this.display.getMonth() + 1);
                };
                BossyCalendar.prototype.selectMonth = function (month) {
                    var year = this.display.getFullYear();
                    this.display = new Date(year, month, 1);
                    this.updateDateMap();
                };
                BossyCalendar.prototype.selectDate = function (date) {
                    if (!date.inMonth) {
                        if (date.day > 7) {
                            this.selected = new Date(this.display.getFullYear(), this.display.getMonth() - 1, date.day);
                            this.previousMonth();
                        }
                        else {
                            this.selected = new Date(this.display.getFullYear(), this.display.getMonth() + 1, date.day);
                            this.nextMonth();
                        }
                    }
                    else {
                        this.selected = new Date(this.display.getFullYear(), this.display.getMonth(), date.day);
                        this.updateDateMap();
                    }
                };
                BossyCalendar.prototype.updateDateMap = function () {
                    var month = [];
                    var week = [];
                    var startDate = new Date(this.display.getFullYear(), this.display.getMonth(), 1);
                    var endDate = new Date(this.display.getFullYear(), this.display.getMonth() + 1, 0);
                    var endDatePrevious = new Date(this.display.getFullYear(), this.display.getMonth(), 0);
                    var day = 1;
                    var weekDay;
                    var endDay = Number.parseInt(endDate.toDateString().split(' ')[2]);
                    var endDayPrevious = Number.parseInt(endDatePrevious.toDateString().split(' ')[2]);
                    while (day <= endDay) {
                        weekDay = ((day - 1) + startDate.getDay()) % 7;
                        if (weekDay === 0) {
                            month.push(week);
                            week = [];
                        }
                        week[weekDay] = {
                            day: day,
                            inMonth: true,
                            value: new Date(this.display.getFullYear(), this.display.getMonth(), day).toDateString()
                        };
                        week[weekDay].selected = (week[weekDay].value === this.selected.toDateString());
                        day++;
                    }
                    month.push(week);
                    var first = month[0].reverse();
                    var last = month.slice(-1)[0];
                    day = 1;
                    for (var i = 0; i < 7; i++) {
                        if (!first[i]) {
                            first[i] = { day: endDayPrevious, inMonth: false };
                            endDayPrevious--;
                        }
                        if (!last[i]) {
                            last[i] = { day: day, inMonth: false };
                            day++;
                        }
                    }
                    first.reverse();
                    this.dateMap = month;
                };
                BossyCalendar = __decorate([
                    core_1.Component({
                        selector: 'bossy-calendar',
                        moduleId: __moduleName,
                        templateUrl: '../templates/calendar.html',
                        styleUrls: ['../styles/calendar.css'],
                        inputs: [
                            'config'
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], BossyCalendar);
                return BossyCalendar;
            }());
            exports_1("BossyCalendar", BossyCalendar);
        }
    }
});
//# sourceMappingURL=calendar.js.map