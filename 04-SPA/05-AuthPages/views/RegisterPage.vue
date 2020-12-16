<template>
  <form class="form" novalidate @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          type="email"
          class="form-control"
          v-model="email"
          ref="email"
          required
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="fullname"
          ref="fullname"
          required
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          type="password"
          class="form-control"
          v-model="password"
          ref="password"
          required
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password2" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input type="checkbox" v-model="agree" /> Я согласен с условиями
        <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link :to="{ name: 'login' }" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: '',
      fullname: '',
      password: '',
      password2: '',
      agree: false,
    };
  },

  methods: {
    validate() {
      if (this.$refs.email.validity.valueMissing) {
        alert('Требуется ввести Email');
        return false;
      }

      if (this.$refs.fullname.validity.valueMissing) {
        alert('Требуется ввести полное имя');
        return false;
      }

      if (this.$refs.password.validity.valueMissing) {
        alert('Требуется ввести пароль');
        return false;
      }

      if (this.password !== this.password2) {
        alert('Пароли не совпадают');
        return false;
      }

      if (!this.agree) {
        alert('Требуется согласиться с условиями');
        return false;
      }

      return true;
    },

    submit() {
      if (!this.validate()) {
        return;
      }

      register(this.email, this.fullname, this.password).then((result) => {
        alert(result.id || result.message);
      });
    },
  },
};
</script>

<style scoped></style>
