<template>
  <div class="page page_onboarding">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
h2 {
  font-family: Nunito, sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 1.2;
  text-align: center;
  color: var(--body-color);
  margin-bottom: 28px;
}
</style>
