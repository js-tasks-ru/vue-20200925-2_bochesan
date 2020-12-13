<template>
  <div>
    <div
      v-for="agendaItem in meetup.agenda"
      :key="agendaItem.key"
      style="width: 100px; margin: 0 auto;"
    >
      <p>{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</p>
      <p>{{ agendaItem.title }}</p>
      <p>{{ agendaItem.description }}</p>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupAgenda',

  props: {
    meetup: Object,
  },
};
</script>

<style scoped></style>
