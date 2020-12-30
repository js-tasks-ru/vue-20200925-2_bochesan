<template>
  <div>
    <p v-if="value">Selected ImageId = {{ value }}</p>
    <p v-else>Image is not selected</p>
    <input type="file" @click.prevent="fileSelected" />
  </div>
</template>

<script>
export default {
  name: 'ImageUploader',

  props: {
    value: Number,
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  methods: {
    fileSelected() {
      this.$emit('change', Math.round(Math.random() * 10) || null);
    },
  },
};
</script>

<style scoped></style>
