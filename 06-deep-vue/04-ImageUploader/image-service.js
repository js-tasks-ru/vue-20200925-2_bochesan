/** URL адрес API */
export const API_URL = 'https://course-vue.javascript.ru/api';

export const ImageService = {
  /**
   * Загружает файл на сервер и получает
   * @param file
   * @return {Promise<Object>}
   */
  // eslint-disable-next-line no-unused-vars
  uploadImage(file) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1 });
      }, 500);
    });
  },

  /**
   * Возвращает ссылку на изображение по ID
   * @param id - ID изображения
   * @return {string} - ссылка на изображение
   */
  getImageURL(id) {
    return id !== null ? `${API_URL}/images/${id}` : null;
  },
};
