<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <form-group>
      <dropdown-button
        v-model="agendaItem_.type"
        title="Тип"
        :options="$options.agendaItemTypes"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.startsAt"
          />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.endsAt"
          />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="specification in $options.fieldSpecifications[agendaItem_.type]"
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
  </div>
</template>

<script>
import FormGroup from './FormGroup';
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { FormGroup, AppInput, DropdownButton },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      agendaItem_: { ...this.agendaItem },
    };
  },

  watch: {
    agendaItem_: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.agendaItem_ });
      },
    },

    startsAt(newValue, oldValue) {
      // Если время не введено или введено не до конца, браузер вернёт пустую строку (при поддержке time)
      // Но Safari не поддерживает input[type=time] :(
      // Придётся проверять
      if (!/([0-1]\d|2[0-3]):[0-5]\d/.test(newValue)) {
        return;
      }
      // Разделяем время на часы и минуты и переводим в минуты
      const timeToMinutes = (time) => {
        const [h, m] = time.split(':').map((x) => parseInt(x, 10));
        return h * 60 + m;
      };
      const newMinutes = timeToMinutes(newValue);
      const oldMinutes = timeToMinutes(oldValue);
      const oldEndsAtMinutes = timeToMinutes(this.agendaItem_.endsAt);
      // Считаем изменение времени в минутах
      const deltaMinutes = newMinutes - oldMinutes;
      // Считаем новое значение
      const newEndsAtMinutes =
        (oldEndsAtMinutes + deltaMinutes + 24 * 60) % (24 * 60);
      // Пересчитываем обратно в часы и минуты
      const hours = Math.floor(newEndsAtMinutes / 60)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor(newEndsAtMinutes % 60)
        .toString()
        .padStart(2, '0');
      this.agendaItem_.endsAt = `${hours}:${minutes}`;
    },
  },

  computed: {
    startsAt() {
      return this.agendaItem_.startsAt;
    },
  },
};
</script>

<style></style>
