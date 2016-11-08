import {BossyCalendar} from '../src/components/calendar';

describe('the calendar component', () => {
	it('should display a date', () => {
		var calendar = new BossyCalendar();
		var year = new Date().getFullYear();
		var date = new Date(year, 5, 1);
		calendar.selectMonth(5);
		expect(calendar.display).toEqual(date);
	})
}),

describe('BossyCalendars nextMonth()', () => {
	it('should say january from december', () => {
		var cal = new BossyCalendar();
		var year = new Date().getFullYear();
		cal.display  = new Date(year, 11, 25);
		cal.nextMonth();
		expect(cal.display.getMonth()).toEqual(0);
	})
});
