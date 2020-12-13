<template>
  <div class="meetups-list transition-list">
    <transition-group name="transition-list">
      <meetup-list-item
        v-for="meetup in meetups"
        :meetup="meetup"
        :key="meetup.id"
      ></meetup-list-item>
    </transition-group>
  </div>
</template>

<script>
import MeetupListItem from './MeetupsListItem';

export default {
  name: 'MeetupsList',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    MeetupListItem,
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
