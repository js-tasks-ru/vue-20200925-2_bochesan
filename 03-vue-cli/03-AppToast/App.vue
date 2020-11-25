<template>
  <div id="app" class="page container">
    <app-toast ref="toaster" />
    <p>
      <button @click="success">Add Success Message</button>
      <button @click="error">Add Error Message</button>
    </p>
  </div>
</template>

<script>
import AppToast from './components/AppToast';

export default {
  name: 'App',

  components: { AppToast },

  data() {
    return {};
  },

  methods: {
    success() {
      this.$refs.toaster.success('Success ' + new Date().toLocaleTimeString());
    },
    error() {
      this.$refs.toaster.error('Error ' + new Date().toLocaleTimeString());
    },
  },
};
</script>

<style scoped>
p {
  margin: 1rem auto;
}
</style>
