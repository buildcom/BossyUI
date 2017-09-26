import {BossyCalendarComponent} from './calendar';

let cal: BossyCalendarComponent;

describe('the calendar component', () => {
  it('should display a date', () => {
    const calendar = new BossyCalendarComponent();
    const year = new Date().getFullYear();
    const date = new Date(year, 5, 1);
    calendar.selectMonth(5);
    expect(calendar.display).toEqual(date);
  });
});

describe('BossyCalendars month', () => {
  beforeEach(() => {
    cal = new BossyCalendarComponent();
    cal.ngOnInit();
  });
  it('should display january after december (nextMonth())', () => {
    const year = new Date().getFullYear();
    cal.display = new Date(year, 11, 25);
    cal.nextMonth();
    expect(cal.display.getMonth()).toEqual(0);
  });
  it('should display December after January (prevMonth())', () => {
    const year = new Date().getFullYear();
    cal.display = new Date(year, 0, 25);
    cal.previousMonth();
    expect(cal.display.getMonth()).toEqual(11);
  });
  it('should have a selected date', () => {
    expect(cal.selected).toBeTruthy();
  });
});
