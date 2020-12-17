<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
// В решении используется метод обновления маршрута replace, т.к. в нашем случае происходит фильтрация митапов, записывать фильтрацию в историю не нужно.
import MeetupsView from '../components/MeetupsView';

// Дефолтные значения
const defaultProp = {
  view: 'list',
  date: 'all',
  participation: 'all',
  search: '',
};

export default {
  name: 'PageWithQuery',
  data() {
    return {
      view: defaultProp.view,
      date: defaultProp.date,
      participation: defaultProp.participation,
      search: defaultProp.search,
    };
  },
  components: { MeetupsView },
  computed: {
    // Получение query, геттер и сеттер для обновления значений
    getQuery: {
      get: function() {
        return this.$route.query;
      },
      set: function(value) {
        this.view = value.view;
        this.date = value.date;
        this.participation = value.participation;
        this.search = value.search;
      }
    }
  },
  watch: {
    // Следим за изменением query и через вычисляемое свойство обновляем значения
    getQuery: {
      handler: function() {
        this.updateProps();
      },
      immediate: true,
    },
    view: function() {
      this.updateQuery();
    },
    date: function() {
      this.updateQuery();
    },
    participation: function() {
      this.updateQuery();
    },
    search: function() {
      this.updateQuery();
    },
  },
  methods: {
    // Формируем объект свойств, в котором если не существует query ставиться значение по умолчанию и передаем объект в сеттер вычисляемого свойства
    updateProps() {
      this.getQuery = {
        view: this.$route.query.view ? this.$route.query.view : this.view,
        date: this.$route.query.date ? this.$route.query.date : this.date,
        participation: this.$route.query.participation ? this.$route.query.participation : this.participation,
        search: this.$route.query.search ? this.$route.query.search : this.search,
      };
    },
    // Формируем новый query при изменении свойств, если они совпадают с дефолтными значениями то не включаем их в объект
    updateQuery() {
      let newQuery = {};
      if (this.view !== defaultProp.view) {
        newQuery.view = this.view;
      }
      if (this.date !== defaultProp.date) {
        newQuery.date = this.date;
      }
      if (this.participation !== defaultProp.participation) {
        newQuery.participation = this.participation;
      }
      if (this.search !== defaultProp.search) {
        newQuery.search = this.search;
      }
      return this.$router.replace({query: newQuery});
    }
  },
};
</script>

<style scoped></style>
