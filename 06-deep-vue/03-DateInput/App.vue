<template>
  <div id="app" class="page container">
    {{ valueAsDate.toUTCString() }}
    <p>
      date with valueAsNumber:
      <date-input :value-as-number.sync="valueAsNumber" />
    </p>
    <p>
      time with valueAsNumber:
      <date-input :value-as-number.sync="valueAsNumber" type="time" />
    </p>
    <p>
      datetime-local with valueAsNumber:
      <date-input :value-as-number.sync="valueAsNumber" type="datetime-local" />
    </p>
    <p>
      date with valueAsDate:
      <date-input :value-as-date.sync="valueAsDate" />
    </p>
    <p>
      date with plain value:
      <date-input v-model="value" />
    </p>
    <p>
      With Icons <button @click="showIcons = !showIcons">Toggle Icons</button>
      <date-input v-model="value">
        <template #left-icon>
          <app-icon v-if="showIcons" icon="search" />
        </template>
        <template #right-icon>
          <app-icon v-if="showIcons" icon="pen-tool" />
        </template>
      </date-input>
    </p>
  </div>
</template>

<script>
import AppIcon from './components/AppIcon';
import DateInput from './components/DateInput';

export default {
  name: 'App',

  components: { AppIcon, DateInput },

  data() {
    return {
      valueAsNumber: +new Date(Date.UTC(2013, 11, 11, 14, 15, 16)),
      value: '2013-12-11',
      showIcons: true,
    };
  },

  computed: {
    valueAsDate: {
      get() {
        return new Date(this.valueAsNumber);
      },
      set(newDate) {
        this.valueAsNumber = +newDate;
      },
    },
  },
};
</script>

<style>
p {
  margin: 1rem auto;
}
</style>
