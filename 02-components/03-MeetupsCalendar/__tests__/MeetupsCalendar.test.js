const { shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const { MeetupsCalendar } = require(getSolutionPath('MeetupsCalendar'));
import { meetups } from './__fixtures__/meetups';
import { advanceTo } from 'jest-date-mock';

function testDaysCount(cells, daysBefore, daysIn, daysAfter) {
  expect(cells).toHaveLength(daysBefore.length + daysIn + daysAfter.length);
}

function testCellsInactive(cells, daysBefore, daysIn, daysAfter) {
  const expectedInactive = [...Array(daysBefore.length).fill(true)]
    .concat(Array(daysIn).fill(false))
    .concat(Array(daysAfter.length).fill(true));
  const cellsHasInactive = cells.map((cell) =>
    cell.classes('rangepicker__cell_inactive'),
  );
  expect(cellsHasInactive).toEqual(expectedInactive);
}

function testCellsText(cells, daysBefore, daysIn, daysAfter) {
  const expectedTextInCells = daysBefore
    .concat([...Array(daysIn).keys()].map((x) => (x + 1).toString()))
    .concat(daysAfter);
  const cellsTexts = cells.map((cell) => cell.text());
  expect(cellsTexts).toEqual(expectedTextInCells);
}

function testMonthTitle(title, _date) {
  const date = new Date(_date);
  const expected = `${date.toLocaleDateString(navigator.language, {
    month: 'long',
  })} ${date.getFullYear()}`;
  expect(title).toBe(expected);
}

function testMonthCalendar(
  wrapper,
  expectedDate,
  daysBefore,
  daysIn,
  daysAfter,
) {
  const cells = wrapper.findAll('.rangepicker__cell').wrappers;
  testDaysCount(cells, daysBefore, daysIn, daysAfter);
  testCellsInactive(cells, daysBefore, daysIn, daysAfter);
  testCellsText(cells, daysBefore, daysIn, daysAfter);
  const title = wrapper.find('.rangepicker__selector-controls div').text();
  testMonthTitle(title, expectedDate);
}

describe('components/MeetupsCalendar', () => {
  describe('MeetupsCalendar', () => {
    it('MeetupsCalendar должен иметь обязательный параметр meetups по списком митапов', () => {
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      expect(wrapper.vm.$options.props.meetups.type).toBe(Array);
      expect(wrapper.vm.$options.props.meetups.required).toBe(true);
    });

    it('MeetupsCalendar должен вывести 5 строк по 7 дней для апреля 2020', () => {
      advanceTo(new Date('2020-04-15'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      const cells = wrapper.findAll('.rangepicker__cell').wrappers;
      expect(cells).toHaveLength(7 * 5);
    });

    it('MeetupsCalendar должен вывести только первые два и последние три дня для апреля 2020 неактивными', () => {
      advanceTo(new Date('2020-04-15'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      const cells = wrapper.findAll('.rangepicker__cell').wrappers;
      testCellsInactive(cells, ['30', '31'], 30, ['1', '2', '3']);
    });

    it('MeetupsCalendar должен вывести правильные числа для апреля 2020', () => {
      advanceTo(new Date('2020-04-15'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      const cells = wrapper.findAll('.rangepicker__cell').wrappers;
      testCellsText(cells, ['30', '31'], 30, ['1', '2', '3']);
    });

    it('MeetupsCalendar должен локализовано месяц и год в заголовке для апреля 2020', () => {
      advanceTo(new Date('2020-04-15'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      const title = wrapper.find('.rangepicker__selector-controls div').text();
      testMonthTitle(title, '2020-04-15');
    });

    it('MeetupsCalendar должен вывести май 2020', () => {
      advanceTo(new Date('2020-05-15'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      testMonthCalendar(
        wrapper,
        '2020-05-15',
        ['27', '28', '29', '30'],
        31,
        [],
      );
    });

    it('MeetupsCalendar должен вывести июнь 2020', () => {
      advanceTo(new Date('2020-06-15'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      testMonthCalendar(wrapper, '2020-06-15', [], 30, [
        '1',
        '2',
        '3',
        '4',
        '5',
      ]);
    });

    it('MeetupsCalendar должен показать февраль 2021 после 10 кликов на след. месяц с апреля 2020', async () => {
      advanceTo(new Date('2020-04-15'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      for (let i = 0; i < 10; i++) {
        const button = wrapper.find('.rangepicker__selector-control-right');
        await button.trigger('click');
      }
      testMonthCalendar(wrapper, '2021-02-15', [], 28, []);
    });

    it('MeetupsCalendar должен показать февраль 2021 после 9 кликов на след. месяц с 31 мая 2020', async () => {
      advanceTo(new Date('2020-05-31'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      for (let i = 0; i < 9; i++) {
        const button = wrapper.find('.rangepicker__selector-control-right');
        await button.trigger('click');
      }
      testMonthCalendar(wrapper, '2021-02-15', [], 28, []);
    });

    it('MeetupsCalendar должен показать ноябрь 2019 после 5 кликов на пред. месяц с апреля 2020', async () => {
      advanceTo(new Date('2020-04-15'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups: [] },
      });
      for (let i = 0; i < 5; i++) {
        const button = wrapper.find('.rangepicker__selector-control-left');
        await button.trigger('click');
      }
      testMonthCalendar(wrapper, '2019-11-15', ['28', '29', '30', '31'], 30, [
        '1',
      ]);
    });

    it('MeetupsCalendar должен показать митапы 12 мая после перехода на следующий месяц с апреля 2020', async () => {
      advanceTo(new Date('2020-04-15'));
      const wrapper = shallowMount(MeetupsCalendar, {
        propsData: { meetups },
      });
      const button = wrapper.find('.rangepicker__selector-control-right');
      await button.trigger('click');
      const events = wrapper
        .findAll('.rangepicker__cell:nth-child(16) .rangepicker__event')
        .wrappers.map((w) => w.text());
      expect(events).toEqual([meetups[4].title, meetups[5].title]);
    });
  });
});
