<template>
  <div id="app">
    <button @click="updateList">Update list</button>
    <fade-transition-group tag="ul">
      <li v-for="item in list" :key="item" :class="{ red: item > 0.5 }">
        <div>{{ item }}</div>
      </li>
    </fade-transition-group>
  </div>
</template>

<script>
import FadeTransitionGroup from './components/FadeTransitionGroup';

export default {
  name: 'App',
  components: { FadeTransitionGroup },
  data() {
    return {
      list: [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ],
    };
  },

  methods: {
    updateList() {
      this.list.push(Math.random());
      this.list.splice(2, 1);
    },
  },
};
</script>

<style scoped>
.red {
  color: red;
}
</style>
