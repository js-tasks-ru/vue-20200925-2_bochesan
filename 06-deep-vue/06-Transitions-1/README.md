# Transitions-1

В первой постановке задача простая.

Требуется добавить в шаблон соответствующие параметры, установить им нужные `name` и `mode`, а также пробросить атрибуты и обработчики событий.

```html
<template>
  <transition name="fade" mode="out-in" v-bind="$attrs" v-on="$listeners">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'FadeTransition',
  inheritAttrs: false,
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

Во втором компоненте потребуется убрать `scoped` со стилей.

```html
<template>
  <transition-group
    class="fade-list"
    name="fade-list"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: 'FadeTransitionGroup',
  inheritAttrs: false,
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
```
