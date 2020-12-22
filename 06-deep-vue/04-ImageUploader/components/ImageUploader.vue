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

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
