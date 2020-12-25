# CounterButton_last_final

В этот раз компоненту требуется иметь локальное состояние. Например, `count_`. Именно это значение выводится в содержимом кнопки. При клике на кнопку не просто порождается событие, но и увеличивается на 1 локальное состояние. Требуется также добавить отслеживание параметра и обновление локального состояния при его обновлении. Можно также добавить `immediate: true`, чтобы не было необходимости устанавливать начальное локальное состояние отдельно. Клонирования значения при этом не требуется, так как число - иммутабельный тип.

```html
<template>
  <button type="button" @click="increment">{{ count_ }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  data() {
    return {
      count_: undefined,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.count_ = newValue;
      },
    },
  },

  methods: {
    increment() {
      this.count_ += 1;
      this.$emit('increment', this.count_);
    },
  },
};
</script>

<style scoped></style>
```
