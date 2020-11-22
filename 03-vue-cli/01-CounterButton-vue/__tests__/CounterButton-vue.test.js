const { shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const CounterButton = require(getSolutionPath('components/CounterButton.vue'))
  .default;

describe('vue-cli/CounterButton-vue', () => {
  describe('CounterButton', () => {
    it('CounterButton должен иметь числовой входной параметр count со значением 0 по умолчанию', () => {
      const wrapper = shallowMount(CounterButton);
      expect(wrapper.vm.$options.props.count.type).toBe(Number);
      expect(wrapper.vm.$options.props.count.required).toBeFalsy();
      expect(wrapper.vm.$options.props.count.default).toBe(0);
    });

    it('CounterButton должен рендерить кнопку с текстом count', () => {
      const count = 42;
      const wrapper = shallowMount(CounterButton, {
        propsData: { count },
      });
      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.text()).toBe(count.toString());
    });

    it('CounterButton должен выводить новое значение счётчика при его обновлении', async () => {
      const wrapper = shallowMount(CounterButton, {
        propsData: { count: 1 },
      });
      await wrapper.setProps({ count: 2 });
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toBe('2');
    });

    it('CounterButton должен порождать событие increment с увеличенным на 1 значением после клика', async () => {
      const wrapper = shallowMount(CounterButton, {
        propsData: { count: 1 },
      });
      const button = wrapper.find('button');

      await button.trigger('click');
      expect(wrapper.emitted().increment).toBeTruthy();
      expect(wrapper.emitted().increment.length).toBe(1);
      expect(wrapper.emitted().increment[0]).toEqual([2]);

      await wrapper.setProps({ count: 2 });
      await button.trigger('click');
      expect(wrapper.emitted().increment.length).toBe(2);
      expect(wrapper.emitted().increment[1]).toEqual([3]);
    });
  });
});
