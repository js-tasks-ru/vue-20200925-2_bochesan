<template>
  <div id="app" class="page container">
    <image-uploader v-model="imageId" />
    <p>Image ID: {{ imageId }}</p>
    <p><button @click="imageId = 2">Set 2</button></p>
  </div>
</template>

<script>
import ImageUploader from './components/ImageUploader';
export default {
  name: 'App',
  components: { ImageUploader },
  data() {
    return {
      imageId: null,
    };
  },
};
</script>

<style>
p {
  margin: 1rem auto;
}
</style>
