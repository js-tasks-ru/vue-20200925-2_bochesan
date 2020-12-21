<template>
  <base-button v-bind="$attrs" v-on="$listeners" class="button_danger">
    <slot />
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'DangerButton',
  components: { BaseButton },
};
</script>

<style scoped>
.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
