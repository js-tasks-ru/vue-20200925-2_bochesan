<template>
  <div style="width: 100px; margin: 0 auto;">{{ meetup.description }}</div>
</template>

<script>
export default {
  name: 'MeetupDescriptionPage',

  props: {
    meetup: Object,
  },
};
</script>

<style scoped></style>
