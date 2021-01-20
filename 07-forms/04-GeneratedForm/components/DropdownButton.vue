<template>
  <select @change="$emit('change', $event.target.value)">
    <option
      v-for="option in options"
      :value="option.value"
      :key="option.value"
      :selected="option.value === value"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'DropdownButton',

  props: {
    options: {
      type: Array,
      required: true,
    },
    value: String,
    title: String,
  },

  model: {
    prop: 'value',
    event: 'change',
  },
};
</script>

<style></style>
