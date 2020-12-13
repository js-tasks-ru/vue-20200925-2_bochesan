<template>
  <div>
    <h1>Meetup Page</h1>
    <template v-if="meetup">
      <p>ID: {{ meetup.title }}</p>
      <p><router-link to="/meetups/2">Go to 2</router-link></p>
      <p>
        <button @click="go('meetup-description')">
          Go To Description
        </button>
      </p>
      <p><button @click="go('meetup-agenda')">Agenda</button></p>
      <router-view :meetup="meetup" />
    </template>
  </div>
</template>

<script>
import { fetchMeetup } from '../data';

export default {
  name: 'MeetupPage',

  data() {
    return {
      meetup: null,
    };
  },

  beforeRouteEnter(to, from, next) {
    fetchMeetup(to.params.meetupId).then((meetup) => {
      next((vm) => vm.setMeetup(meetup));
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next();
    } else {
      fetchMeetup(to.params.meetupId).then((meetup) => {
        this.setMeetup(meetup);
        next();
      });
    }
  },

  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
    },

    go(target) {
      this.$router.push({ name: target });
    },
  },
};
</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
  padding-bottom: 48px;
}

.meetup__content p {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-buttons > .button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
