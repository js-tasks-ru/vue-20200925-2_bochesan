import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

function getMeetupInfo(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((res) => res.json());
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  agendaItemTitles,
  agendaItemIcons,

  data: {
    rawMeetup: {},
  },

  mounted() {
    // Требуется получить данные митапа с API
    this.fetchMeetup(MEETUP_ID);
  },

  computed: {
    meetup() {
      return {
        ...this.rawMeetup,
        image: this.rawMeetup.imageId ? getMeetupCoverLink(this.rawMeetup) : undefined,
        date: new Date(this.rawMeetup.date),
        localDate: new Date(this.rawMeetup.date).toLocaleDateString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
    }
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()

    async fetchMeetup(meetupId) {
      return this.rawMeetup = await getMeetupInfo(meetupId);
    }
  },
});
