<template>
  <div id="app">
    <button @click="view = !view">Switch View</button>

    <fade-transition>
      <div v-if="view" key="view-1">View 1</div>
      <div v-else key="view-2">View 2</div>
    </fade-transition>

    <hr />

    <button @click="updateList">Update list</button>

    <fade-transition-group tag="div">
      <div v-for="item in list" :key="item">
        {{ item }}
        <div></div>
      </div>
    </fade-transition-group>
  </div>
</template>

<script>
import FadeTransition from './components/FadeTransition';
import FadeTransitionGroup from './components/FadeTransitionGroup';

export default {
  name: 'App',
  components: { FadeTransitionGroup, FadeTransition },
  data() {
    return {
      view: 0,
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

<style></style>
