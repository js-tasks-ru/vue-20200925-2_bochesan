<template>
  <div class="container">
    <meetups-view v-bind.sync="meetupsViewOptions" />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const defaults = {
  view: 'list',
  search: '',
  date: 'all',
  participation: 'all',
};

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      meetupsViewOptions: {
        date: defaults.date,
        participation: defaults.participation,
        search: defaults.search,
        view: defaults.view,
      },
    };
  },

  computed: {
    routeQuery() {
      return this.$route.query;
    },
  },

  watch: {
    routeQuery: {
      immediate: true,
      handler(value) {
        this.meetupsViewOptions = Object.fromEntries(
          Object.keys(this.meetupsViewOptions).map((key) => [
            key,
            value[key] || defaults[key],
          ]),
        );
      },
    },

    meetupsViewOptions: {
      handler() {
        this.$router
          .replace({
            query: Object.fromEntries(
              Object.entries(this.meetupsViewOptions).filter(
                ([key, value]) => value !== defaults[key],
              ),
            ),
          })
          .catch((err) => {
            if (err.name !== 'NavigationDuplicated') {
              throw err;
            }
          });
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
