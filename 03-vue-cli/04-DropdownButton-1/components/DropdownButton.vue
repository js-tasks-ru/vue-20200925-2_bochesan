<template>
  <div class="dropdown show">
    <button type="button" class="button dropdown__toggle dropdown__toggle_icon">
      <app-icon icon="coffee" />
      Заголовок - два
    </button>

    <div class="dropdown__menu show">
      <button class="dropdown__item dropdown__item_icon" type="button">
        <app-icon icon="coffee" />
        раз
      </button>
      <button class="dropdown__item dropdown__item_icon" type="button">
        <app-icon icon="coffee" />
        два
      </button>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'DropdownButton',

  components: { AppIcon },
};
</script>

<style scoped></style>
