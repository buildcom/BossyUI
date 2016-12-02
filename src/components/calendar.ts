import {Component, OnInit} from '@angular/core';
import {BossyCalendarConfig} from '../config/calendar';


declare const module: any;


@Component({
	moduleId: module.id,
	selector: 'bossy-calendar',
	templateUrl: '../templates/calendar.html',
	styleUrls: ['../styles/calendar.css'],
	inputs: [
		'config'
	]
})
export class BossyCalendar {
	dateMap: Array<any> = [];
	days: Array<string> = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	public config: any;
	public options: BossyCalendarConfig;
	public display: Date = new Date();
	public selected: Date = new Date();

	constructor() {}

	ngOnInit() {
		this.updateDateMap();
	}

	previousMonth() {
		this.selectMonth(this.display.getMonth() - 1);
	}

	nextMonth() {
		this.selectMonth(this.display.getMonth() + 1);
	}

	selectMonth(month) {
		var year = this.display.getFullYear();
		this.display = new Date(year, month, 1);
		this.updateDateMap();
	}

	selectDate(date) {
		if (!date.inMonth) {
			if (date.day > 7) {
				this.selected = new Date(this.display.getFullYear(), this.display.getMonth() - 1, date.day);
				this.previousMonth();
			} else {
				this.selected = new Date(this.display.getFullYear(), this.display.getMonth() + 1, date.day);
				this.nextMonth();
			}
		} else {

			this.selected = new Date(this.display.getFullYear(), this.display.getMonth(), date.day);
			this.updateDateMap();
		}
	}

	updateDateMap() {
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
		for (let i = 0; i < 7; i++) {
			if (!first[i]) {
				first[i] = { day: endDayPrevious, inMonth: false};
				endDayPrevious--;
			}
			if (!last[i]) {
				last[i] = { day: day, inMonth: false };
				day++;
			}
		}
		first.reverse();

		this.dateMap = month;

	}
}
