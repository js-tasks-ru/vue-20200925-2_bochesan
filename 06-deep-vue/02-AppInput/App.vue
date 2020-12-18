<template>
  <div id="app" class="page container">
    <p>
      <app-input v-model="value" />
    </p>
    <p>
      Small
      <app-input v-model="value" small />
    </p>
    <p>
      Rounded
      <app-input v-model="value" rounded />
    </p>
    <p>
      Password
      <app-input type="password" v-model="value" />
    </p>
    <p>
      Textarea
      <app-input v-model="value" multiline />
    </p>
    <p>
      With Icons <button @click="showIcons = !showIcons">Toggle Icons</button>
      <app-input v-model="value">
        <template #left-icon>
          <app-icon v-if="showIcons" icon="search" />
        </template>
        <template #right-icon>
          <app-icon v-if="showIcons" icon="pen-tool" />
        </template>
      </app-input>
    </p>
    <p>
      Value + Input
      <app-input :value="value" @input="value = $event" />
    </p>
    <p>
      Value + Change
      <app-input :value="value" @change="value = $event" />
    </p>
  </div>
</template>

<script>
import AppInput from './components/AppInput';
import AppIcon from './components/AppIcon';

export default {
  name: 'App',

  components: { AppIcon, AppInput },

  data() {
    return {
      value: 'value',
      showIcons: true,
    };
  },
};
</script>

<style>
p {
  margin: 1rem auto;
}
</style>
