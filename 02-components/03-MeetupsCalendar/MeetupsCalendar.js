/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button @click="lastMonth" class="rangepicker__selector-control-left"></button>
          <div>{{titleMonth}} {{year}}</div>
          <button @click="featureMonth" class="rangepicker__selector-control-right"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="(day, index) in getCalendar" :key="index" class="rangepicker__cell" :class="day.status === 'noactive' ? 'rangepicker__cell_inactive' : ''">
          {{ day.day }}
          <span v-if="day.meetups">
            <a v-for="(meetup, index) in day.meetups" class="rangepicker__event">{{ meetup.title }}</a>
          </span>
        </div>
      </div>
    </div>
  </div>`,

  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    }
  },

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed: {
    getCalendar() {
      let calendar = [];
      
      // Количество дней в месяце
      let now_month_days = 33 - new Date(this.year, this.month, 33).getDate();
      // Первый день текущего месяца (т.к. воскресенье это 0, берем предыдущий день и нумерация дней начнется с 0 с понедельника)
      let first_day = new Date(this.year, this.month, 0).getDay();
      // Количество дней в предыдущем месяце
      let last_month_days = 33 - new Date(this.year, this.month - 1, 33).getDate();

      // Структура массива календаря это надор дней, которые имеют вид:
      // {
      //   date: "",    // Дата дня, для поиска митапа в этот день
      //   status: "",   // Статус дня для текущего месяца или прошлого/будущего
      //   day: "",     // Номер дня
      //   meetups: [],   // Массив митапов в этот день
      // }

      // Массив прошлого месяца
      let last_month = [];
      // Заполняем массив предыдущего месяца до первого числа текущего месяца
      for (let i = 0; i < first_day; i++) {
        last_month.push({date: new Date(this.year, this.month - 1, last_month_days).getTime(), status: "noactive", day: last_month_days, meetups: []});
        last_month_days--;
      }
      last_month.reverse();

      // Текущий месяц
      let now_month = [];
      // Заполняем массив текущего месяца в соответствии с количеством дней
      for (let i = 1; i <= now_month_days; i++) {
        now_month.push({date: new Date(this.year, this.month, i).getTime(), status: "active", day: i, meetups: []});
      }
      // Склеиваем предыдущий месяц и текущий месяц
      calendar = last_month.concat(now_month);

      // Календарь самый крупный календарь имеет 6 строк по 7 дней (42 дня)
      let lengthCalendar = 42;
      
      // Если текущий месяц начинается с понедельника-пятницы то календарь будет иметь вид 5 строк (-7 дней)
      if (last_month.length < 5) lengthCalendar = lengthCalendar - 7;
      // Если текущий месяц начинается с понедельника и в месяце 28 дней то календарь будет иметь вид 4 строки (-7 дней)
      if (calendar.length === 28) lengthCalendar = lengthCalendar - 7;
      
      // Следующий месяц
      let feature_month = [];
      // Добиваем календарь числами следующего месяца до полного заполнения календаря
      for (let i = 1; i <= lengthCalendar - calendar.length; i++) {
        feature_month.push({date: new Date(this.year, this.month + 1, i).getTime(), status: "noactive", day: i, meetups: []});
      }

      // Склеиваем календарь
      calendar = calendar.concat(feature_month);

      // Проходимся по сформированному календарю и если день календаря совпадает с днем проведения митапа
      // записываем в этот день данные о митапе
      for (const day of calendar) {
        for (const meetup of this.meetups) {
          if (new Date(meetup.date).getFullYear() === new Date(day.date).getFullYear() && new Date(meetup.date).getDate() === new Date(day.date).getDate()) {
            day.meetups.push(meetup);
          }
        }
      }

      return calendar;
    },

    titleMonth() {
      return new Date(this.year, this.month).toLocaleString('en', {
        month: 'long',
      });
    }
  },

  // Методы понадобятся для переключения между месяцами
  methods: {
    lastMonth() {
      if (this.month - 1 < 0) {
        this.year = this.year - 1;
        this.month = 11;
      } else {
        this.month = this.month - 1;
      }
    },
    featureMonth() {
      if (this.month + 1 > 11) {
        this.year = this.year + 1;
        this.month = 0;
      } else {
        this.month = this.month + 1;
      }
    }
  },
};
