<template>
  <transition-group name="fade-list" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: 'FadeTransitionGroup',
};
</script>

<style>
.fade-list {
  position: relative;
}

.fade-list > * {
  transition: all 0.3s ease-out;
}

.fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list-enter,
.fade-list-leave-to {
  opacity: 0;
}

.fade-list-move {
  transition: transform 0.3s;
}
</style>
