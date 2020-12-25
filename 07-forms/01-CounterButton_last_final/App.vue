<template>
  <div id="app">
    <p><counter-button v-model="count1" /> - count1 = {{ count1 }}</p>
    <p><counter-button v-model="count1" /> - count1 = {{ count1 }}</p>
    <p><counter-button v-model="count2" /> - count2 = {{ count2 }}</p>
    <p>
      <counter-button :count="count3" @increment="count3 = $event" />
      - count3 = {{ count3 }}
    </p>
    <p><counter-button /> - no count</p>
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

<style scoped></style>
