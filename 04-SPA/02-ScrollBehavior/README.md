# ScrollBehavior

Задача достаточно простая: 

```javascript
export function scrollBehavior(to, from, savedPosition) {
  // Если есть hash, прокручиваем к элементу по селектору
  if (to.hash) {
    return { selector: to.hash };
  }

  // Если есть savedPosition, возвращаем его же (при переходе назад)
  if (savedPosition) {
    return savedPosition;
  }

  // Если оба маршрута в мета правилах имели saveScrollPosition, не меняем положение.
  // Можно также использовать прямой вариант, если нужно точное совпадение, и дочерний маршрут может отменить правило 
  // if (to.meta.saveScrollPosition && from.meta.saveScrollPosition)
  const hasSavePosition = (route) => route.matched.some((matched) => matched.meta.saveScrollPosition);
  if (hasSavePosition(to) && hasSavePosition(from)) {
    return false;
  }

  // По умолчанию прокручиваем вверх
  return { x: 0, y: 0 };
}
```

