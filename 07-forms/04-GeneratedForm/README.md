# GeneratedForm

Задача кажется сложной только на первый взгляд. С использованием динамических компонентов и динамических директив решение сводится к простому циклу и установке значений. Остальной код компонента не отличается от предыдущей задачи.

```html
<form-group
  v-for="specification in fieldSpecifications"
  :key="specification.field"
  :label="specification.title"
>
  <component
    :is="specification.component"
    :[specification.model.prop]="agendaItem_[specification.field]"
    @[specification.model.event]="agendaItem_[specification.field] = $event"
    v-bind="specification.props"
  />
</form-group>
```

Если считать, что модель совпадает с моделью компонента, а особой реактции на событие не требуется, можно сразу установить модель.

```html
<form-group
  v-for="specification in fieldSpecifications"
  :key="specification.field"
  :label="specification.title"
>
  <component
    :is="specification.component"
    v-model="agendaItem_[specification.field]"
    v-bind="specification.props"
  />
</form-group>
```
