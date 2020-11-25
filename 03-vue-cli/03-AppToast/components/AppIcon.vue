<template>
  <img class="icon" alt="icon" :src="iconSrc" />
</template>

<script>
const iconMap = {
  'alert-circle': require('../assets/icons/icon-alert-circle.svg'),
  'check-circle': require('../assets/icons/icon-check-circle.svg'),
};
export default {
  name: 'AppIcon',

  props: {
    icon: {
      type: String,
      required: true,
      validate: (name) => Object.keys(iconMap).includes(name),
    },
  },

  computed: {
    iconSrc() {
      return iconMap[this.icon];
    },
  },
};
</script>

<style scoped></style>
