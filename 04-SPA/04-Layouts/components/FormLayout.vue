<template>
  <div class="page page_meetup-forms">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped>
.page.page_meetup-forms {
  padding: 70px 0;
}
h2 {
  font-family: Nunito, sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 1.2;
  color: var(--body-color);
  margin-bottom: 28px;
}
</style>
