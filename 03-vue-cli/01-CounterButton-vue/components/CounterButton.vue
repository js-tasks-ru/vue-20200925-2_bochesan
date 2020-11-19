<template>
  <button type="button" @click="changeCount">
    {{ count }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',
  model: {
    prop: 'count',
    event: 'increment',
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    changeCount() {
      this.$emit('increment', this.count + 1);
    },
  },
  beforeMount: function () {
    if (typeof this.count !== 'number' || this.count === 0) {
      this.$emit('increment', 0);
    }
  },
};
</script>

<style></style>
