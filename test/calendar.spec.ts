import {BossyCalendar} from '../src/components/calendar';

describe('the tooltip component', () => {
	it('should have a function setActive that is active when persisting', () => {
		var calendar = new BossyCalendar();
		var year = new Date().getFullYear();
		var month = 1;
		var date = new Date(year, month, 1);
		calendar.selectMonth(month);
		expect(calendar.display).toEqual(date);
	})
});
