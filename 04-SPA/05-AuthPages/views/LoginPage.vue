<template>
  <form class="form" @submit.prevent="auth">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" v-model="email.value" placeholder="demo@email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" v-model="password.value" placeholder="password" class="form-control" />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: {
        value: null,
        error: 'Требуется ввести Email',
      },
      password: {
        value: null,
        error: 'Требуется ввести пароль',
      },
    };
  },
  methods: {
    auth() {
      if (!this.email.value) {
        return this.message(this.email.error);
      }
      if (!this.password.value) {
        return this.message(this.password.error);
      }

      login(this.email.value, this.password.value).then((res) => {
        // Если в ответе нет ошибки и кода ошибки будем считать что пользователь авторизовался
        if (res.error === undefined && res.statusCode === undefined) {
          return this.message(res.fullname);
        }
        // Иначе выводим текст ошибки
        else {
          return this.message(res.message);
        }
      });
    },
    message(message) {
      alert(message);
    },
  },
};
</script>

<style scoped></style>
