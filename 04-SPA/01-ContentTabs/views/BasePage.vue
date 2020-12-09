<template>
  <content-tabs :tabs="tabs">
    <router-view :prop="prop" />
  </content-tabs>
</template>

<script>
import ContentTabs from '../components/ContentTabs';

export default {
  name: 'BasePage',

  components: { ContentTabs },

  data() {
    return {
      tabs: [
        { to: '/a', text: 'Page A' },
        { to: { name: 'b' }, text: 'Page B' },
      ],
      prop: 'Prop Data',
    };
  },
};
</script>

<style scoped></style>
