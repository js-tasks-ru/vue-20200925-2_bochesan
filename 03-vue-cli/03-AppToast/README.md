# AppToast

## Хранение тостов

Первое, что требуется сделать -- добавить компоненту свойство в состоянии (data), например, `toasts`, в котором будет храниться список текущих тостов.

Именно этот список будет определять состояние компонента и будет выводиться в шаблоне.

Хранить в списке понадобится не только текст сообщения, но и его тип.
 
## Методы success, error

Осталось только реализовать собственно методы добавления тостов. Эти методы довольно простые. Требуется добавить новый тост в список тостов. 

Тут же можно используя `setTimeout` установить таймер на удаление этого тоста через 5 секунд.

## key списка тостов

Мы пока плохо знаем, что делает `key`. Но, если вы читали Style Guide, или используете линтер (возможно, встроенные в вашу среду разработки), то могли видеть ошибки об отсутствии `key` на элементе с директивой `v-for`.

Нет какого-либо естественного идентификатора у тоста. Можно создать случайный, либо использовать, например, идентификатор его таймера.

## Решение

```html
<template>
  <div class="toasts">
    <div
      v-for="toast in styledToasts"
      :key="toast.id"
      class="toast"
      :class="toast.class"
    >
      <app-icon :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  components: { AppIcon },

  data() {
    return {
      toasts: [],
    };
  },

  computed: {
    styledToasts() {
      const icons = {
        success: 'check-circle',
        error: 'alert-circle',
      };

      const classes = {
        success: 'toast_success',
        error: 'toast_error',
      };

      return this.toasts.map((toast) => ({
        ...toast,
        icon: icons[toast.style],
        class: classes[toast.style],
      }));
    },
  },

  methods: {
    error(message) {
      this.show('error', message);
    },

    success(message) {
      this.show('success', message);
    },

    show(style, message) {
      const toast = { style, message };

      toast.id = setTimeout(() => {
        // Теоретически должно работать удаление просто первого тоста, например, методом unshift
        // Но это не очевидно, такое решение пришлось бы прокомментировать.
        // А можно просто найти нужный тост и удалить.
        // Такое решение ещё и универсальное, и будет работать, 
        // даже если в будущем мы захотим сделать тосты с разными таймерами 
        this.toasts.splice(this.toasts.indexOf(toast), 1); 
      }, DELAY);

      this.toasts.push(toast);
    },
  },
};
</script>

<style scoped></style>
```
