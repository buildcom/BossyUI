import {Component, Input, OnInit} from '@angular/core';
import {BossyCalendarConfig} from '../../config/calendar';

@Component({
  selector: 'bossy-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class BossyCalendarComponent implements OnInit {
  @Input() config: BossyCalendarConfig;
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
  public options: BossyCalendarConfig;
  public display: Date = new Date();
  public selected: Date = new Date();

  constructor() {
  }

  ngOnInit() {
    this.updateDateMap();
  }

  previousMonth() {
    this.selectMonth(this.display.getMonth() - 1);
  }

  nextMonth() {
    this.selectMonth(this.display.getMonth() + 1);
  }

  selectMonth(month: number) {
    const year = this.display.getFullYear();
    this.display = new Date(year, month, 1);
    this.updateDateMap();
  }

  selectDate(date: any) {
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
    const month: Array<any> = [];
    let week: Array<any> = [];
    const startDate = new Date(this.display.getFullYear(), this.display.getMonth(), 1);
    const endDate = new Date(this.display.getFullYear(), this.display.getMonth() + 1, 0);
    const endDatePrevious = new Date(this.display.getFullYear(), this.display.getMonth(), 0);
    let day = 1;
    const endDay = parseInt(endDate.toDateString().split(' ')[2], 10);
    let endDayPrevious = parseInt(endDatePrevious.toDateString().split(' ')[2], 10);

    while (day <= endDay) {
      const weekDay = ((day - 1) + startDate.getDay()) % 7;
      const weekDayValue = new Date(this.display.getFullYear(), this.display.getMonth(), day).toDateString();

      if (weekDay === 0) {
        month.push(week);
        week = [];
      }

      week[weekDay] = {
        day: day,
        inMonth: true,
        value: weekDayValue,
        selected: (weekDayValue === this.selected.toDateString())
      };
      day++;
    }

    month.push(week);

    const first = month[0].reverse();
    const last = month.slice(-1)[0];
    day = 1;
    for (let i = 0; i < 7; i++) {
      if (!first[i]) {
        first[i] = {day: endDayPrevious, inMonth: false};
        endDayPrevious--;
      }
      if (!last[i]) {
        last[i] = {day: day, inMonth: false};
        day++;
      }
    }
    first.reverse();

    this.dateMap = month;
  }
}
