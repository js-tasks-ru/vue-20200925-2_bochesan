<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="meetup_.title" />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="date" />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="meetup_.place" />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="meetup_.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="meetup_.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in meetup_.agenda"
        :key="agendaItem.id"
        :agendaItem.sync="agendaItem"
        @update:agendaItem="updateAdendaItem(index, $event)"
        @remove="removeAgendaItem(index)"
        class="mb-3"
      />

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

function deepClone(a) {
  return JSON.parse(JSON.stringify(a));
}

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: 'MeetupForm',

  data() {
    return {
      // Клонирование в локальный объект
      meetup_: deepClone(this.meetup),
    };
  },

  computed: {
    // Преобразование даты к виду YYYY-MM-DD и работа с ней через v-modal
    date: {
      get: function () {
        return new Date(this.meetup_.date).toISOString().split('T')[0];
      },
      set: function (value) {
        this.meetup_.date = new Date(value).toISOString().split('T')[0];
      },
    },
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
    },
  },

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  methods: {
    // Сабмит с новым объектом данных
    handleSubmit() {
      this.$emit('submit', deepClone(this.meetup_));
    },
    // Добавление новой программы с временем начала, равным времени окончания предыдущей программы, если это не первая программа иначе 00:00
    addAgendaItem() {
      const newItem = buildAgendaItem();
      this.meetup_.agenda.push({
        ...newItem,
        startsAt: this.meetup_.agenda.length
          ? this.meetup_.agenda[this.meetup_.agenda.length - 1].endsAt
          : '00:00',
      });
    },
    // Удаление программы
    removeAgendaItem(index) {
      this.meetup_.agenda.splice(index, 1);
    },
    // Обновление программы при изменении данных
    updateAdendaItem(index, newValue) {
      this.meetup_.agenda.splice(index, 1, newValue);
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
