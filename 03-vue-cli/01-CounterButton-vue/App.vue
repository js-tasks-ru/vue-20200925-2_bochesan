<template>
  <div id="app">
    <p>
      <counter-button v-model="count1"></counter-button> - count1 = {{ count1 }}
    </p>
    <p>
      <counter-button v-model="count1"></counter-button> - count1 = {{ count1 }}
    </p>
    <p>
      <counter-button v-model="count2"></counter-button> - count2 = {{ count2 }}
    </p>
    <p>
      <counter-button
        :count="count3"
        @increment="count3 = $event"
      ></counter-button>
      - count3 = {{ count3 }}
    </p>
  </div>
</template>

<script>
import CounterButton from './components/CounterButton';

export default {
  name: 'App',
  components: { CounterButton },
  data() {
    return {
      count1: 15,
      count2: undefined,
      count3: 0,
    };
  },
};
</script>

<style></style>
