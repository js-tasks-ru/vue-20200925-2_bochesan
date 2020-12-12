const {
  shallowMount,
  mount,
  createLocalVue,
  RouterLinkStub,
} = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const ContentTabs = require(getSolutionPath('components/ContentTabs')).default;
import VueRouter from 'vue-router';

describe('SPA/ContentTabs', () => {
  describe('ContentTabs', () => {
    const tabs = [
      { to: '/a', text: 'a' },
      { to: '/b', text: 'b' },
    ];

    it('ContentTabs должен иметь обязательный параметр список tabs', () => {
      const wrapper = shallowMount(ContentTabs, {
        propsData: { tabs: [] },
      });
      expect(wrapper.vm.$options.props.tabs.type).toBe(Array);
      expect(wrapper.vm.$options.props.tabs.required).toBe(true);
    });

    it('ContentTabs должен рендерить список вкладок', () => {
      const wrapper = shallowMount(ContentTabs, {
        propsData: { tabs },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      });
      const links = wrapper.findAllComponents(RouterLinkStub).wrappers;
      expect(links.map((link) => link.text())).toEqual(['a', 'b']);
    });

    it('Активная вкладка должна иметь класс content-tabs__tab_active', async () => {
      const localVue = createLocalVue();
      localVue.use(VueRouter);
      const router = new VueRouter({
        routes: [{ path: '/a' }, { path: '/b' }],
      });
      const wrapper = mount(ContentTabs, {
        propsData: { tabs },
        localVue,
        router,
      });
      await router.replace('/b');
      const links = wrapper.findAll('a').wrappers;
      expect(
        links.map((link) => link.classes('content-tabs__tab_active')),
      ).toEqual([false, true]);
    });
  });
});
