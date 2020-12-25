<template>
  <button type="button" @click="increment">{{ count_ }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  data() {
    return {
      count_: undefined,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.count_ = newValue;
      },
    },
  },

  methods: {
    increment() {
      this.count_ += 1;
      this.$emit('increment', this.count_);
    },
  },
};
</script>

<style scoped></style>
