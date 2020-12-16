<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">/</router-link></li>
          <li><router-link to="/login">/login</router-link></li>
          <li><router-link to="/register">/register</router-link></li>
        </ul>
      </nav>
    </header>
    <main class="page page_onboarding"><router-view /></main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
</style>
