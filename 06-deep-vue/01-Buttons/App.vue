<template>
  <div id="app" class="page container">
    <p>
      <base-button @click="clicked">Base Click Me</base-button>
    </p>
    <p>
      <base-button block>Base Block</base-button>
    </p>
    <p>
      <base-button tag="a" href="#">Base Button Link</base-button>
    </p>
    <hr />
    <p>
      <primary-button @click="clicked">Primary Click Me</primary-button>
    </p>
    <p>
      <primary-button block>Primary Block</primary-button>
    </p>
    <p>
      <primary-button tag="a" href="#">Primary Button Link</primary-button>
    </p>
    <hr />
    <p>
      <secondary-button @click="clicked">Secondary Click Me</secondary-button>
    </p>
    <p>
      <secondary-button block>Secondary Block</secondary-button>
    </p>
    <p>
      <secondary-button tag="a" href="#">Secondary Button Link</secondary-button>
    </p>
    <hr />
    <p>
      <danger-button @click="clicked">Danger Click Me</danger-button>
    </p>
    <p>
      <danger-button block>Danger Block</danger-button>
    </p>
    <p>
      <danger-button tag="a" href="#">Danger Button Link</danger-button>
    </p>
    <p>
      <danger-button tag="router-link" to="/">Danger Button Link</danger-button>
    </p>
  </div>
</template>

<script>
import PrimaryButton from './components/PrimaryButton';
import SecondaryButton from './components/SecondaryButton';
import BaseButton from './components/BaseButton';
import DangerButton from './components/DangerButton';

export default {
  name: 'App',
  components: { BaseButton, SecondaryButton, PrimaryButton, DangerButton },
  methods: {
    clicked() {
      alert('Clicked');
    },
  },
};
</script>

<style>
p {
  margin: 1rem auto;
}
</style>
