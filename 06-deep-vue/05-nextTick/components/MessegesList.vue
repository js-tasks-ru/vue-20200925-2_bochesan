<template>
  <div class="messages-list">
    <article v-for="message in messages" :key="message.id" class="message">
      {{ message.text }}
    </article>
  </div>
</template>

<script>
export default {
  name: 'MessagesList',

  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.message {
  background-color: #ddd;
  border: 1px solid #aaa;
  border-radius: 5px;
  margin: 1rem 0 1rem auto;
  padding: 0.5rem;
  width: 80%;
  word-break: break-all;
}
</style>
