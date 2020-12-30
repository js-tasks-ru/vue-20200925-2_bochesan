<template>
  <form @submit.prevent="handleSubmit" class="form meetup-form">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="meetup_.title" />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="meetup_.date" />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="meetup_.place" />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            class="form-control"
            v-model="meetup_.description"
            rows="3"
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
        :agenda-item="agendaItem"
        @update:agendaItem="updateAgendaItem(index, $event)"
        @remove="removeAgendaItem(index)"
        class="mb-3"
      />

      <div class="form-section_append">
        <button type="button" @click="addAgendaItem" data-test="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          @click="$emit('cancel')"
          data-test="cancel"
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

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      meetup_: deepClone(this.meetup),
    };
  },

  methods: {
    addAgendaItem() {
      const newItem = buildAgendaItem();
      if (this.meetup_.agenda.length) {
        newItem.startsAt = this.meetup_.agenda[
          this.meetup_.agenda.length - 1
        ].endsAt;
      }
      this.meetup_.agenda.push(newItem);
    },

    updateAgendaItem(index, newItem) {
      this.meetup_.agenda.splice(index, 1, newItem);
    },

    removeAgendaItem(index) {
      this.meetup_.agenda.splice(index, 1);
    },

    handleSubmit() {
      this.$emit('submit', deepClone(this.meetup_));
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
