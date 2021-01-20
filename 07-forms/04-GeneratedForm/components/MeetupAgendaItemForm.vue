<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <dropdown-button title="Тип" :options="$options.agendaItemTypes" />
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <app-input type="time" placeholder="00:00" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <app-input type="time" placeholder="00:00" />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Заголовок</label>
      <app-input />
    </div>
    <div class="form-group">
      <label class="form-label">Описание</label>
      <app-input multiline />
    </div>
    <div class="form-group">
      <label class="form-label">Язык</label>
      <dropdown-button
        :options="[
          { value: null, text: 'Не указано' },
          { value: 'RU', text: 'RU' },
          { value: 'EN', text: 'EN' },
        ]"
      />
    </div>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
};
</script>

<style></style>
