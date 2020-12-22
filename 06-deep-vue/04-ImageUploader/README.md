# ImageUploader

Основная задача - загрузка изображения.

Для получения изображения требуется обработать событие `@change` у поля ввода. Файл с выбранным изображением можно найти в `$event.target.files[0]`.

Файл с изображением также можно получить в любой момент времени, если установить `ref` на `input`.

Ещё одна проблема может быть, если при удалении изображения не сбрасывать значения поля ввода. В этом случае не получится повторно выбрать тот же файл, так как не сработает событие `change`. Для удаления выбранного изображения можно, например, установить пустую строку или `null` в качестве значения. При клике на "Удалить изображение" важно также вызывать `$event.preventDefault();`, чтобы не открыть диалог выбора файла.

```html
<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="imageURL ? `--bg-image: url('${imageURL}')` : ''"
    >
      <span v-if="state === 'loading'">Загрузка...</span>
      <span v-else-if="state === 'filled'">Удалить изображение</span>
      <span v-else-if="state === 'empty'">Загрузить изображение</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        ref="fileControl"
        :disabled="loading"
        @change="handleFileSelected"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',

  model: {
    prop: 'imageId',
    event: 'change',
  },

  props: {
    imageId: {
      default: null,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    state() {
      if (this.loading) {
        return 'loading';
      } else if (this.imageId !== null) {
        return 'filled';
      } else {
        return 'empty';
      }
    },

    imageURL() {
      return this.imageId ? ImageService.getImageURL(this.imageId) : null;
    },
  },

  methods: {
    handleFileSelected($event) {
      this.loading = true;
      // Или ImageService.uploadImage(this.$refs.fileControl.files[0]).then(
      ImageService.uploadImage($event.target.files[0]).then((result) => {
        this.$emit('change', result.id);
        this.loading = false;
      });
    },

    handleClick($event) {
      if (this.state === 'filled') {
        $event.preventDefault();
        this.resetFile();
      }
    },

    resetFile() {
      this.$refs.fileControl.value = '';
      this.$emit('change', null);
    },
  },
};
</script>
```
