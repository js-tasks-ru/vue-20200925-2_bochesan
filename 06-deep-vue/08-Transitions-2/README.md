# Transitions-2 | VNodes

Получить список переданных элементов можно из `this.$slots.default`, в котором хранится список виртуальных узлов VNode.

Пройдясь по ним циклом, можно модифицировать каждый из них.

`vnode.data` хранит данные узла, включая статически установленные классы в поле `staticClass`. В этом поле хранится список классов через пробел строкой, также как они установлены в HTML атрибуте class.

Требуется проверить, есть ли у узла уже установленные статически классы. Если есть, то добавить новый класс через пробел, иначе присвоить строку с новым классом.

```javascript
this.$slots.default.forEach((vnode) => {
  if (vnode.data.staticClass) {
    vnode.data.staticClass += ' fade-list-item';
  } else {
    vnode.data.staticClass = 'fade-list-item';
  }
});
```

Затем надо cрендарить с помощью render-функции компонент `TransitionGroup` с этим содержимым. В параметрах требуется передать аттрибуты и обработчики событий для реализации `TransparentWrapper` обёртки, а также параметр `name` и класс.

```javascript
render(h) {
  this.$slots.default.forEach((vnode) => {
    if (vnode.data.staticClass) {
      vnode.data.staticClass += ' fade-list-item';
    } else {
      vnode.data.staticClass = 'fade-list-item';
    }
  });

  return h(
    'transition-group',
    {
      on: this.$listeners,
      attrs: this.$attrs,
      props: {
        name: 'fade-list',
      },
      class: 'fade-list',
    },
    this.$slots.default,
  );
}
``` 

Остаётся только описать стили. Чтобы они сработали, потребуется использовать `deep` селектор, и почти все правила начинать с `.fade-list >>> `.

```css
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  transition: all 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
} 
```
