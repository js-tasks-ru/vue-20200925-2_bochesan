<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="/assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            :value="agendaItem.startsAt"
            @change="
              $emit('update:agendaItem', {
                ...agendaItem,
                startsAt: $event.target.value,
              })
            "
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
            :value="agendaItem.endsAt"
            @change="
              $emit('update:agendaItem', {
                ...agendaItem,
                endsAt: $event.target.value,
              })
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupAgendaItemForm',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
