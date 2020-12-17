<template>
  <div>
    <fieldset>
      <legend>Текущие значения</legend>
      <p>view = {{ view }}</p>
      <p>date = {{ date }}</p>
      <p>participation = {{ participation }}</p>
      <p>search = {{ search }}</p>
      <p>route = {{ $route.fullPath }}</p>
    </fieldset>
    <fieldset>
      <legend>Обновить значения</legend>
      <p>
        <router-link
          to="/?date=future&participation=attending&search=msk&view=calendar"
        >
          Router Link to
          /?date=future&participation=attending&search=msk&view=calendar
        </router-link>
      </p>
      <p>
        <a href="?date=future&participation=attending&search=msk&view=calendar">
          Link to /?date=future&participation=attending&search=msk&view=calendar
        </a>
      </p>
      <p><a href="?">Reset</a></p>
      <p>
        view:
        <button @click="$emit('update:view', 'list')">list</button> |
        <button @click="$emit('update:view', 'calendar')">calendar</button>
      </p>
      <p>
        date:
        <button @click="$emit('update:date', 'all')">all</button> |
        <button @click="$emit('update:date', 'future')">future</button> |
        <button @click="$emit('update:date', 'past')">past</button>
      </p>
      <p>
        participation:
        <button @click="$emit('update:participation', 'all')">all</button> |
        <button @click="$emit('update:participation', 'attending')">
          attending
        </button>
        |
        <button @click="$emit('update:participation', 'organizing')">
          organizing
        </button>
      </p>
      <p>
        search:
        <button @click="$emit('update:search', '')">''</button> |
        <button @click="$emit('update:search', 'msk')">msk</button> |
        <button @click="$emit('update:search', 'value')">value</button>
      </p>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'MeetupsView',

  props: {
    view: String,
    date: String,
    participation: String,
    search: String,
  },
};
</script>

<style scoped>
fieldset {
  padding: 1rem;
}
</style>
