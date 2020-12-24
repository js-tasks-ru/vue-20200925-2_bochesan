const { mount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const NodesPagination = require(getSolutionPath(
  'components/NodesPagination.vue',
)).default;

describe('deep-vue/NodesPagination', () => {
  describe('NodesPagination', () => {
    it('NodesPagination должен иметь числовые параметры page и perPage', async () => {
      const wrapper = mount(NodesPagination);
      expect(wrapper.vm.$options.props.page.type).toBe(Number);
      expect(wrapper.vm.$options.props.perPage.type).toBe(Number);
    });

    it('NodesPagination должен выводить элементы текущей страницы', async () => {
      const wrapper = mount(NodesPagination, {
        propsData: {
          page: 1,
          perPage: 3,
        },
        slots: {
          default: `<span>A</span><span>B</span><span>C</span><span>D</span><span>E</span>`,
        },
      });
      expect(wrapper.text()).toBe('ABC');
      await wrapper.setProps({
        page: 2,
      });
      expect(wrapper.text()).toBe('DE');
    });
  });
});
