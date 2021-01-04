<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" v-model="agendaItem_.type" title="Тип">
        <option
          v-for="option in $options.agendaItemTypes"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
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
          <option
            v-for="option in $options.talkLanguages"
            :value="option.value"
            :key="option.value"
          >
            {{ option.text }}
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

  agendaItemTypes: getAgendaItemTypes(),
  talkLanguages: getTalkLanguages(),

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
