<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="agendaItem_.type"
      />
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.startsAt"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.endsAt"
          />
        </div>
      </div>
    </div>

    <form-group
      class="form-group"
      v-for="(data, index) in componentData"
      :key="index"
      :label="data.title"
    >
      <component
        :is="data.component"
        v-on:[data.model.event]="handleEvent"
        v-model="agendaItem_[data.field]"
        v-bind="data.props"
      ></component>
    </form-group>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  data() {
    return {
      agendaItem_: { ...this.agendaItem },
    };
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    componentData() {
      return this.$options.fieldSpecifications[this.agendaItem_.type];
    },
    // Отслеживание изменения времени начала программы
    startsAt() {
      return this.agendaItem_.startsAt;
    },
  },

  watch: {
    // Если вычисляемое свойство меняется, засчет изменения времени начала программы, присваиваем новое значение концу времени программы
    startsAt: function (newValue) {
      if (this.agendaItem.startsAt !== newValue) {
        this.agendaItem_.endsAt = this.calcTime(
          this.calcTime(newValue, this.agendaItem.startsAt, true),
          this.agendaItem_.endsAt,
        );
      }
    },
    agendaItem_: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.agendaItem_ });
      },
    },
  },

  components: { AppInput, DropdownButton, FormGroup },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  methods: {
    handleEvent() {
      this.$emit('update:agendaItem', { ...this.agendaItem_ });
    },
    // Сложение или вычитание(difference = true) двух значений времени типа hh:mm
    calcTime(timeA, timeB, difference = false) {
      let [hoursA, minutesA] = timeA.split(':');
      let [hoursB, minutesB] = timeB.split(':');
      let hours;
      let minutes;

      if (difference) {
        hours = Number(hoursA) - Number(hoursB);
        minutes = Number(minutesA) - Number(minutesB);
      } else {
        hours = Number(hoursA) + Number(hoursB);
        minutes = Number(minutesA) + Number(minutesB);
      }

      if (minutes >= 60) {
        hours = hours + 1;
        minutes = minutes - 60;
      } else if (minutes < 0) {
        hours = hours - 1;
        minutes = minutes + 60;
      }

      if (hours >= 24) {
        hours = hours - 24;
      } else if (hours < 0) {
        hours = hours + 24;
      }

      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      return `${hours}:${minutes}`;
    },
  },
};
</script>

<style></style>
