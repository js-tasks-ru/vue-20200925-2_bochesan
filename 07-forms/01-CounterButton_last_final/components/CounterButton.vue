<template>
  <button @click="countChange">{{ count_ }}</button>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {
      count_: this.count,
    };
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    count: function (newValue) {
      return (this.count_ = newValue);
    },
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
  methods: {
    countChange() {
      this.count_++;
      return this.$emit('increment', this.count_);
    },
  },
};
</script>

<style></style>
