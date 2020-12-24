# NodesPagination | Render-функция

Требуется создать компонент, который выведет не всё своё содержимое, переданное в слот по умолчанию, а только определённый подмассив его виртуальных узлов (элементов или компонентов).

Это можно сделать через render-функцию. Содержимое слота по умолчанию доступно через `this.$slots.default`. Методом `slice` можно выбрать подмассив узлов, а render-функцией - срендерить.

```javascript
render(h) {
  const start = (this.page - 1) * this.perPage;
  const end = this.page * this.perPage;

  const content = this.$slots.default
    ? this.$slots.default.slice(start, end)
    : [];

  return h('div', content);
}
```  
