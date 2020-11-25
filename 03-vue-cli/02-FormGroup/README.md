# FormGroup

В задаче нет ничего сложного, но компонент пригодится нам в будущем.

## Решение

```vue
<template>
  <div class="form-group" :class="{ 'form-group_inline': inline }">
    <label class="form-label" v-if="label">{{ label }}</label>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormGroup',

  props: {
    inline: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
};
</script>

<style scoped></style>
```
