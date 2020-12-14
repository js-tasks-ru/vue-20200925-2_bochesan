<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/page-a">/page-a</router-link></li>
          <li><router-link to="/page-b">/page-b</router-link></li>
          <li><router-link to="/page-unknown">/page-unknown</router-link></li>
        </ul>
      </nav>
    </header>
    <main><router-view /></main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped></style>
