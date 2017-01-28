import {BossyCalendar} from '../src/components/calendar';

let cal : BossyCalendar;

describe('the calendar component', () => {
	it('should display a date', () => {
		let calendar = new BossyCalendar();
		let year = new Date().getFullYear();
		let date = new Date(year, 5, 1);
		calendar.selectMonth(5);
		expect(calendar.display).toEqual(date);
	});
}),

describe('BossyCalendars month', () => {
	beforeEach(()=> {
		cal = new BossyCalendar();
		cal.ngOnInit();
	});
	it('should display january after december (nextMonth())', () => {
		let year = new Date().getFullYear();
		cal.display  = new Date(year, 11, 25);
		cal.nextMonth();
		expect(cal.display.getMonth()).toEqual(0);
	});
	it('should display December after January (prevMonth())', () => {
		let year = new Date().getFullYear();
		cal.display = new Date(year, 0, 25);
		cal.previousMonth();
		expect(cal.display.getMonth()).toEqual(11);
	});
	it('should have a selected date', () => {
		expect(cal.selected).toBeTruthy();
	});
});
