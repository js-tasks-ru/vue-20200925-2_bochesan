<template>
  <div id="app" class="page container">
    <form-group>
      <div class="input-group">
        <input class="form-control" placeholder="No label" />
      </div>
    </form-group>

    <hr />

    <form-group label="Label Text">
      <div class="input-group">
        <input class="form-control" placeholder="With label" />
      </div>
    </form-group>

    <hr />

    <p>
      <form-group inline>
        <div class="input-group">
          <input class="form-control" placeholder="Inline" />
        </div>
      </form-group>
      <form-group inline>
        <div class="input-group">
          <input class="form-control" placeholder="Inline" />
        </div>
      </form-group>
    </p>
  </div>
</template>

<script>
import FormGroup from './components/FormGroup';

export default {
  name: 'App',

  components: { FormGroup },

  data() {
    return {};
  },

  methods: {
    success() {
      this.$refs.toaster.success('Success ' + new Date().toTimeString());
    },
    error() {
      this.$refs.toaster.error('Error ' + new Date().toTimeString());
    },
  },
};
</script>

<style scoped>
p,
hr {
  margin: 1rem auto;
}

.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

.input-group .form-control {
  width: 100%;
}
</style>
