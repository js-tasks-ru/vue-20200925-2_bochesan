<template>
  <div id="app" style="width: 250px; margin: 2rem auto;">
    <div style="display: flex; justify-content: space-between;">
      <button
        v-for="i in 5"
        :key="i"
        @click="page = i"
        :class="{ active: page === i }"
      >
        {{ i }}
      </button>
    </div>
    <hr />
    <nodes-pagination :page="page" :per-page="5">
      <fieldset v-for="i in 22" :key="i">
        <legend>Card #{{ i }}</legend>
        Body
      </fieldset>
    </nodes-pagination>
  </div>
</template>

<script>
import NodesPagination from './components/NodesPagination';

export default {
  name: 'App',
  components: { NodesPagination },

  data() {
    return {
      page: 1,
    };
  },
};
</script>

<style scoped>
.active {
  transform: scale(1.25);
}
</style>
