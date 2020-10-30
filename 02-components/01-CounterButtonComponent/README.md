# Компонент CounterButton

Компонент достаточно простой. Также, как в аналогичной задаче предыдущего модуля, создаём кнопку, но теперь работаем со входным параметром.

Важно, что параметр локально не изменяется, а новое значение возвращается родителю вместе с событием. 

```javascript
export const CounterButton = {
  template: '<button type="button" @click="increment">{{ count }}</button>',

  // Теперь текущее значение счётчика приходит от родителя через входной параметр
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  // Описываем модель компонента на параметр count с событием increment 
  model: {
    prop: 'count',
    event: 'increment',
  },

  methods: {
    increment() {
      // При клике на кнопку порождаем событие и отправляем новое значение
      this.$emit('increment', this.count + 1);
    },
  },
};
```
