<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="image"
    >
      <span>{{ message }}</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        :disabled="loading"
        @change="uploadImage"
        @click="removeImage"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',

  data() {
    return {
      loading: false, // Индикатор состояния загрузки
    };
  },

  model: {
    prop: 'imageId',
    event: 'change',
  },

  props: {
    imageId: {
      type: Number,
      default: null,
    },
  },

  computed: {
    // Вычисляемое свойство бекграунд
    image() {
      return {
        '--bg-image':
          this.getImage(this.imageId) !== null
            ? `url('${this.getImage(this.imageId)}')`
            : '',
      };
    },
    // Вычисляемое свойство надписи
    message() {
      let mess;
      if (this.imageId === null && !this.loading) {
        mess = 'Загрузить изображение';
      }
      if (this.imageId !== null && !this.loading) {
        mess = 'Удалить изображение';
      }
      if (this.loading) {
        mess = 'Загрузка...';
      }
      return mess;
    },
  },

  methods: {
    // Получение ссылки изображения
    getImage(ID) {
      return ImageService.getImageURL(ID);
    },
    // При клике сбрасываем значение инпута и imageId
    removeImage(event) {
      event.target.value = null;
      this.$emit('change', null);
    },
    // Загрузка изображения на сервер
    uploadImage(event) {
      // Пока идет загрузка индикатор загрузки true
      this.loading = true;
      let file = event.target.files[0];
      ImageService.uploadImage(file).then((el) => {
        // Загрузка завершена – индикатор загрузки false и обновляем imageId
        this.loading = false;
        this.$emit('change', el.id);
      });
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
