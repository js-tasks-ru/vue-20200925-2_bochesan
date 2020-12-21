# AppInput

Первое отличие этой задачи от предыдущей с кнопками в том, что требуется не просто передать атрибуты и обработчики событий, но и добавить модель на value+input.

Для этого требуется:
1. Добавить `value` в список параметров;
2. Создать вычисляемое свойство, которое содержит все обработчики событий, основанные на `$listeners`, но с переопределёнными `input` и `change`, которые возвращают `$event.target.value`, вместо стандартного `InputEvent`. 

Второе усложнение в том, что если использовать динамический компонент, то `value` на `textarea` корректно не будет, так как будет устанавливаться как атрибут, а не как свойство. Для решения этой проблемы требуется добавить модификатор `.prop`.

Кроме того требуется проверять, что передано содержимое в слоты через `this.$slots`. В идеале эту проверку надо делать после монтирования и при обновлении компонента, так как иконки могут появиться позже или пропасть.

```html
<template>
  <div
    class="input-group"
    :class="{
      'input-group_icon': hasIcon,
      'input-group_icon-left': hasLeftIcon,
      'input-group_icon-right': hasRightIcon,
    }"
  >
    <slot name="left-icon" />
    <component
      :is="multiline ? 'textarea' : 'input'"
      class="form-control"
      :class="{
        'form-control_rounded': this.rounded,
        'form-control_sm': this.small,
      }"
      v-bind="$attrs"
      v-on="listeners"
      :value.prop="value"
    />
    <slot name="right-icon" />
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  inheritAttrs: false,

  props: {
    value: {},
    rounded: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
  },

  model: {
    prop: 'value',
    event: 'input',
  },

  data() {
    return {
      hasLeftIcon: false,
      hasRightIcon: false,
    };
  },

  mounted() {
    this.updateHasIcons();
  },

  updated() {
    this.updateHasIcons();
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: ($event) => {
          this.$emit('input', $event.target.value);
        },
        change: ($event) => {
          this.$emit('change', $event.target.value);
        },
      };
    },

    hasIcon() {
      return this.hasLeftIcon || this.hasRightIcon;
    },
  },

  methods: {
    updateHasIcons() {
      this.hasLeftIcon = !!this.$slots['left-icon'];
      this.hasRightIcon = !!this.$slots['right-icon'];
    },
  },
};
</script>
```
