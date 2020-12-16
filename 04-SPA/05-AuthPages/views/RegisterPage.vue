<template>
  <form class="form" @submit.prevent="register">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" v-model="email.value" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" v-model="name.value" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" v-model="passwords.password.value" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" v-model="passwords.repeatPassword.value" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input type="checkbox" v-model="checkbox.value" /> Я согласен с условиями <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link to="login" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: {
        value: null,
        error: 'Требуется ввести Email',
      },
      name: {
        value: null,
        error: 'Требуется ввести полное имя',
      },
      passwords: {
        password: {
          value: null,
          error: 'Требуется ввести пароль',
        },
        repeatPassword: {
          value: null,
          error: 'Требуется ввести пароль',
        },
        error: 'Пароли не совпадают',
      },
      checkbox: {
        value: false,
        error: 'Требуется согласиться с условиями',
      },
    };
  },
  methods: {
    register() {
      if (!this.email.value) {
        return this.message(this.email.error);
      }
      if (!this.name.value) {
        return this.message(this.name.error);
      }
      if (!this.passwords.password.value) {
        return this.message(this.passwords.password.error);
      }
      if (!this.passwords.repeatPassword.value) {
        return this.message(this.passwords.repeatPassword.error);
      }
      if (this.passwords.password.value !== this.passwords.repeatPassword.value) {
        return this.message(this.passwords.error);
      }
      if (!this.checkbox.value) {
        return this.message(this.checkbox.error);
      }

      register(this.email.value, this.name.value, this.passwords.password.value).then((res) => {
        // Если в ответе нет ошибки и кода ошибки будем считать что пользователь зарегистрировался
        if (res.error === undefined && res.statusCode === undefined) {
          return this.message(res.id);
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
