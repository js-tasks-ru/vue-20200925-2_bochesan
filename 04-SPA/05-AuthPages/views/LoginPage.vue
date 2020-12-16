<template>
  <form class="form" novalidate @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          type="email"
          placeholder="demo@email"
          class="form-control"
          required
          ref="email"
          v-model="email"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          type="password"
          placeholder="password"
          class="form-control"
          required
          ref="password"
          v-model="password"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link :to="{ name: 'register' }" class="link">
        Зарегистрируйтесь
      </router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    validate() {
      if (this.$refs.email.validity.valueMissing) {
        alert('Требуется ввести Email');
        return false;
      }

      if (this.$refs.password.validity.valueMissing) {
        alert('Требуется ввести пароль');
        return false;
      }

      return true;
    },

    submit() {
      if (!this.validate()) {
        return;
      }

      login(this.email, this.password).then((result) => {
        alert(result.fullname || 'Неверные учетные данные');
      });
    },
  },
};
</script>

<style scoped></style>
