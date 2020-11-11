/** Короткий псевдоним для создания Date (клонирования, преобразования) */
const mkDate = (date) => new Date(date);
/** Получение дня недели числом от 1 (ПН) до 7 (ВС) из даты {Date} */
const getWeekday = (date) => date.getDay() || 7;
/** Увеличение и уменьшение даты на определённое число дней или месяцев */
const addDays = (date, days) =>
  mkDate(date.getTime() + 1000 * 60 * 60 * 24 * days);
const subtractDays = (date, days) => addDays(date, -days);
const addMonth = (date, n) =>
  mkDate(mkDate(date).setMonth(date.getMonth() + n));
const subtractMonth = (date, n) => addMonth(date, -n);
/** Получение первой даты месяца */
const getFirstDateOfMonth = (date) => mkDate(mkDate(date).setDate(1));

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `
    <div class="rangepicker">
      <div class="rangepicker__calendar">
        <div class="rangepicker__month-indicator">
          <div class="rangepicker__selector-controls">
            <button class="rangepicker__selector-control-left" @click="setPreviousMonth"></button>
            <div>{{ localCurrentMonthAndYear }}</div>
            <button class="rangepicker__selector-control-right" @click="setNextMonth"></button>
          </div>
        </div>
        <div class="rangepicker__date-grid">
          <div
            v-for="cell in calendarCells"
            :key="cell.id"
            class="rangepicker__cell"
            :class="{ rangepicker__cell_inactive: !cell.isCurrentMonth }"
          >
            {{ cell.date }}
            <a
              v-for="meetup in cell.meetups"
              :key="meetup.id"
              href="#"
              class="rangepicker__event"
            >{{ meetup.title }}</a>
          </div>
        </div>
      </div>
    </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentDate: new Date(),
    };
  },

  computed: {
    firstDateOfCurrentMonth() {
      return getFirstDateOfMonth(this.currentDate);
    },

    meetupsByDate() {
      const result = {};
      this.meetups.forEach((meetup) => {
        const dateString = new Date(meetup.date).toDateString();
        if (!result[dateString]) {
          result[dateString] = [meetup];
        } else {
          result[dateString].push(meetup);
        }
      });
      return result;
    },

    calendarCells() {
      const firstDateOfNextMonth = getFirstDateOfMonth(
        addMonth(this.currentDate, 1),
      );
      const lastDateOfMonth = subtractDays(firstDateOfNextMonth, 1);
      const startDate = subtractDays(
        this.firstDateOfCurrentMonth,
        getWeekday(this.firstDateOfCurrentMonth) - 1,
      );
      const finishDate = addDays(
        lastDateOfMonth,
        7 - getWeekday(lastDateOfMonth),
      );
      const cells = [];

      for (
        let dayOfCalendar = startDate;
        dayOfCalendar <= finishDate;
        dayOfCalendar.setDate(dayOfCalendar.getDate() + 1)
      ) {
        cells.push({
          id: Number(dayOfCalendar),
          date: dayOfCalendar.getDate(),
          isCurrentMonth:
            dayOfCalendar.getMonth() === this.currentDate.getMonth(),
          meetups: this.meetupsByDate[dayOfCalendar.toDateString()],
        });
      }

      return cells;
    },

    localCurrentMonthAndYear() {
      return `${this.currentDate.toLocaleDateString(navigator.language, {
        month: 'long',
      })} ${this.currentDate.getFullYear()}`;
    },
  },

  methods: {
    setPreviousMonth() {
      this.currentDate = subtractMonth(this.firstDateOfCurrentMonth, 1);
    },

    setNextMonth() {
      this.currentDate = addMonth(this.firstDateOfCurrentMonth, 1);
    },
  },
};
