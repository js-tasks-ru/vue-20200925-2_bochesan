<template>
  <div id="app" class="page container">
    <p>selectedType = {{ selectedType }}</p>
    <p>
      <button @click="selectedType = 'registration'">Set registration</button>
    </p>
    <p>
      <dropdown-button
        v-model="selectedType"
        :options="agendaItemTypes"
        title="Событие"
      />
    </p>
    <p>selectedLang = {{ selectedLang }}</p>
    <p>
      <dropdown-button
        v-model="selectedLang"
        :options="langOptions"
        title="Язык"
      />
    </p>
  </div>
</template>

<script>
import DropdownButton from './components/DropdownButton';

const agendaIconMap = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemTypes = [
  {
    value: 'registration',
    text: 'Регистрация',
  },
  {
    value: 'opening',
    text: 'Открытие',
  },
  {
    value: 'break',
    text: 'Перерыв',
  },
  {
    value: 'coffee',
    text: 'Coffee Break',
  },
  {
    value: 'closing',
    text: 'Закрытие',
  },
  {
    value: 'afterparty',
    text: 'Afterparty',
  },
  {
    value: 'talk',
    text: 'Доклад',
  },
  {
    value: 'other',
    text: 'Другое',
  },
].map((item) => ({
  ...item,
  icon: agendaIconMap[item.value],
}));

export default {
  name: 'App',
  components: { DropdownButton },
  data() {
    return {
      agendaItemTypes: agendaItemTypes,
      langOptions: [
        { value: 'EN', text: 'EN' },
        { value: 'RU', text: 'RU' },
      ],
      selectedLang: 'EN',
      selectedType: undefined,
    };
  },
};
</script>

<style scoped>
p {
  margin: 1rem auto;
}
</style>
