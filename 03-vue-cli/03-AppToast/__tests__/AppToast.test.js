const { shallowMount, mount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const AppToast = require(getSolutionPath('components/AppToast')).default;
const AppIcon = require('../components/AppIcon').default;

jest.useFakeTimers();

describe('vue-cli/AppToast', () => {
  describe('AppToast', () => {
    const message = 'Sample Message';

    it('AppToast изначально не показывает ни одного тоста', async () => {
      const wrapper = shallowMount(AppToast);
      expect(wrapper.find('.toast').exists()).toBe(false);
    });

    it('AppToast должен выводить success тост с сообщением после вызова метода success', async () => {
      const wrapper = mount(AppToast);
      wrapper.vm.success(message);
      await wrapper.vm.$nextTick();
      const toast = wrapper.find('.toast');
      expect(toast.exists()).toBe(true);
      expect(toast.text()).toBe(message);
      expect(toast.classes('toast_success')).toBe(true);
      const icon = wrapper.findComponent(AppIcon);
      expect(icon.exists()).toBe(true);
      expect(icon.props().icon).toBe('check-circle');
    });

    it('AppToast должен выводить error тост с сообщением после вызова метода error', async () => {
      const wrapper = mount(AppToast);
      wrapper.vm.error(message);
      await wrapper.vm.$nextTick();
      const toast = wrapper.find('.toast');
      expect(toast.exists()).toBe(true);
      expect(toast.text()).toBe(message);
      expect(toast.classes('toast_error')).toBe(true);
      const icon = wrapper.findComponent(AppIcon);
      expect(icon.exists()).toBe(true);
      expect(icon.props().icon).toBe('alert-circle');
    });

    it('AppToast должен выводить список тостов в порядке добавления', async () => {
      const wrapper = mount(AppToast);
      const messages = ['success_1', 'success_2', 'error_1', 'success_3'];
      messages.forEach((message) => {
        const method = message.startsWith('success') ? 'success' : 'error';
        wrapper.vm[method](message);
      });
      await wrapper.vm.$nextTick();
      const toasts = wrapper.findAll('.toast').wrappers;
      expect(toasts).toHaveLength(messages.length);
      expect(toasts.map((toast) => toast.text())).toEqual(messages);
    });

    it('AppToast удалять тост через 5 секунд', async () => {
      const wrapper = mount(AppToast);

      wrapper.vm.success('1');
      jest.advanceTimersByTime(2500);

      wrapper.vm.success('2');
      jest.advanceTimersByTime(2500 + 100); // 5100, first toast deleted

      await wrapper.vm.$nextTick();

      const toasts = wrapper.findAll('.toast').wrappers;
      expect(toasts).toHaveLength(1);
      expect(toasts.map((toast) => toast.text())).toEqual(['2']);
    });
  });
});
