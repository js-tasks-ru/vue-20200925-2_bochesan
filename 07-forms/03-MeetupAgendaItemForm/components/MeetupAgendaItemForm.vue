<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="agendaItem_.type">
        <option v-for="item in $options.options" :value="item.value">
          {{ item.text }}
        </option>
      </select>
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

    <template v-if="agendaItem_.type === 'talk'">
      <div class="form-group">
        <label class="form-label">Тема</label>
        <input class="form-control" v-model="agendaItem_.title" />
      </div>
      <div class="form-group">
        <label class="form-label">Докладчик</label>
        <input class="form-control" v-model="agendaItem_.speaker" />
      </div>
      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea
          class="form-control"
          v-model="agendaItem_.description"
        ></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Язык</label>
        <select class="form-control" v-model="agendaItem_.language">
          <option v-for="item in $options.languages" :value="item.value">
            {{ item.text }}
          </option>
        </select>
      </div>
    </template>
    <template v-else-if="agendaItem_.type === 'other'">
      <div class="form-group">
        <label class="form-label">Заголовок</label>
        <input class="form-control" v-model="agendaItem_.title" />
      </div>
      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea
          class="form-control"
          v-model="agendaItem_.description"
        ></textarea>
      </div>
    </template>
    <template v-else>
      <div class="form-group">
        <label class="form-label">Нестандартный текст (необязательно)</label>
        <input class="form-control" v-model="agendaItem_.title" />
      </div>
    </template>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  options: getAgendaItemTypes(),
  languages: getTalkLanguages(),

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

  computed: {
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
  methods: {
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
