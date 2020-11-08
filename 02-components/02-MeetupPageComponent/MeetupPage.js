import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div><meetup-view v-if="meetup" :meetup="meetup"></meetup-view></div>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: null,
    };
  },

  async mounted() {
    await this.fetch();
  },

  methods: {
    async fetch() {
      this.meetup = await fetchMeetup(MEETUP_ID);
    },
  },
};
