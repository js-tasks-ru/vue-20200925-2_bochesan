import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <meetup-agenda-item
        class="meetup-agenda__item"
        v-for="agendaItem in agenda"
        :key="agendaItem.id"
        :agenda-item="agendaItem"
      ></meetup-agenda-item>
    </div>`,

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
