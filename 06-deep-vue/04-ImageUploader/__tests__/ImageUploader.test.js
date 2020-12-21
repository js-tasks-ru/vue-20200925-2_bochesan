const { shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const { ImageService } = require(getSolutionPath('image-service'));
const ImageUploader = require(getSolutionPath('components/ImageUploader.vue'))
  .default;

const mockID = 123;
jest.mock('../image-service');
jest.spyOn(ImageService, 'uploadImage').mockResolvedValue({ id: mockID });
jest.spyOn(ImageService, 'getImageURL').mockImplementation((id) => id);

describe('deep-vue/ImageUploader', () => {
  describe('ImageUploader', () => {
    jest.useFakeTimers();

    let wrapper;
    let input;
    let label;
    let value = '';
    let getFiles;

    beforeEach(() => {
      wrapper = shallowMount(ImageUploader);
      input = wrapper.find('input');
      label = wrapper.find('label');

      getFiles = jest.fn();
      Object.defineProperty(input.element, 'files', {
        get: getFiles,
        set: jest.fn(),
      });

      Object.defineProperty(input.element, 'value', {
        get: () => value,
        set: (newValue) => {
          value = newValue;
        },
      });
    });

    it('ImageUploader должен иметь параметр imageId со значением null по умолчанию', async () => {
      expect(wrapper.vm.$options.props.imageId).toBeTruthy();
      expect(wrapper.vm.$options.props.imageId.default).toBe(null);
    });

    it('ImageUploader должен иметь текст "Загрузить изображение", когда он пуст', async () => {
      expect(label.text()).toBe('Загрузить изображение');
    });

    it('ImageUploader должен переходить в состояние загрузки после выбора изображения, выводить "Загрузка..." и переводить input в состояние disabled', async () => {
      value = '/fake_path/image.png';
      getFiles.mockReturnValue([new File([], 'image.png')]);

      await input.trigger('change');
      expect(label.text()).toBe('Загрузка...');
      expect(input.element.disabled).toBe(true);

      jest.runAllTimers();
      await wrapper.vm.$nextTick();
      expect(label.text()).not.toBe('Загрузка...');
      expect(input.element.disabled).toBe(false);
    });

    it('ImageUploader должен порождать событие change с ID изображения после загрузки изображения', async () => {
      value = '/fake_path/image.png';
      getFiles.mockReturnValue([new File([], 'image.png')]);

      await input.trigger('change');
      jest.runAllTimers();
      expect(wrapper.emitted().change).toHaveLength(1);
      expect(wrapper.emitted().change[0]).toEqual([mockID]);
    });

    it('ImageUploader должен загружать файл через ImageService.uploadImage', async () => {
      value = '/fake_path/image.png';
      getFiles.mockReturnValue([new File([], 'image.png')]);

      await input.trigger('change');
      jest.runAllTimers();
      expect(ImageService.uploadImage.mock.calls[0][0]).toBeInstanceOf(File);
    });

    it('ImageUploader должен иметь текст "Удалить изображение", когда изображение выбрано, и выводить его через --bg-image', async () => {
      wrapper.setProps({
        imageId: mockID,
      });
      await wrapper.vm.$nextTick();
      expect(label.text()).toBe('Удалить изображение');
      expect(
        getComputedStyle(label.element).getPropertyValue('--bg-image'),
      ).toContain(mockID);
    });

    it('ImageUploader должен сбрасывать изображение, при клике на "Удалить изображение"', async () => {
      value = '/fake_path/image.png';
      getFiles.mockReturnValue([new File([], 'image.png')]);
      wrapper.setProps({
        imageId: mockID,
      });
      await wrapper.vm.$nextTick();
      await label.trigger('click');
      expect(wrapper.emitted().change).toHaveLength(1);
      expect(wrapper.emitted().change[0]).toEqual([null]);

      wrapper.setProps({
        imageId: null,
      });
      await wrapper.vm.$nextTick();
      expect(label.text()).toBe('Загрузить изображение');
      expect(label.attributes().style).toBeFalsy();
      expect(value).toBeFalsy();
    });
  });
});
