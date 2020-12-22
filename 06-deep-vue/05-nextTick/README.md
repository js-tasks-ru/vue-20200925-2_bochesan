# nextTick

Чтобы прокрутить список вниз, требуется изменить его DOM свойство `scrollTop`.

```javascript
element.scrollTop = element.scrollHeight - element.clientHeight;
``` 

Найти элемент можно разными способами, но лучшим будет вариант, при котором используются `ref` ссылки и `el` свойства Vue компонентов, а не поиск по DOM дереву по идентификатору или классам.

```html
<messages-list class="messages" :messages="messages" ref="messagesList" />
```

```javascript
const element = this.$refs['messagesList'].$el;
// this.$refs['messagesList'] - компонент со списком сообщений
// .$el - его корневой элемент

// Если бы требовалось работать не с корневым элементом, 
// то можно было бы добавить ref внутрь MessagesList, 
// либо, если это невозможно, использовать поиск внутри $el 
```

Сделать это сразу после добавления сообщения нельзя, так как оно ещё не появилось в DOM.

Чтобы выполнить действие после обновления DOM, требуется воспользоваться `nextTick`.

```javascript
this.$nextTick().then(() => {
  const element = this.$refs['messagesList'].$el;
  element.scrollTop = element.scrollHeight - element.clientHeight;
});
```
