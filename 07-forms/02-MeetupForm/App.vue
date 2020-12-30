<template>
  <div id="app" class="wrapper bg-grey page">
    <div class="container">
      <pre><code>{{ meetup }}</code></pre>
      <meetup-form
        :meetup="meetup"
        submit-text="Сабмит"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script>
import MeetupForm from './components/MeetupForm';

export default {
  name: 'App',

  components: { MeetupForm },

  data() {
    return {
      meetup: {
        id: 0,
        title: '',
        description: '',
        imageId: null,
        date: new Date(),
        place: '',
        agenda: [],
      },
    };
  },

  methods: {
    handleSubmit(meetup) {
      this.meetup = meetup;
    },

    handleCancel() {
      alert('Cancel');
    },
  },
};
</script>

<style></style>
