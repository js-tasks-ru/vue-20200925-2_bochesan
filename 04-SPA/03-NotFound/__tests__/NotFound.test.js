import VueRouter from 'vue-router';
import { createLocalVue, mount } from '@vue/test-utils';
const { getSolutionPath } = require('taskbook-test-utils');
const { router } = require(getSolutionPath('router/index.js'));
const NotFoundPage = require(getSolutionPath('views/NotFoundPage')).default;
import PageA from '../views/PageA';
import PageB from '../views/PageB';

describe('SPA/NotFound', () => {
  describe('404 - NotFound', () => {
    it('NotFoundPage должен отображаться, когда страница не найдена', async () => {
      const localVue = createLocalVue();
      localVue.use(VueRouter);
      const routerView = { template: '<router-view />' };
      const wrapper = mount(routerView, {
        localVue,
        router,
      });

      expect(wrapper.findComponent(PageA).exists()).toBe(false);
      await wrapper.vm.$router.replace('/page-a');
      expect(wrapper.findComponent(PageA).exists()).toBe(true);

      expect(wrapper.findComponent(PageB).exists()).toBe(false);
      await wrapper.vm.$router.replace('/page-b');
      expect(wrapper.findComponent(PageB).exists()).toBe(true);

      expect(wrapper.findComponent(NotFoundPage).exists()).toBe(false);
      await wrapper.vm.$router.replace('/some-page-that-does-not-exist');
      expect(wrapper.findComponent(NotFoundPage).exists()).toBe(true);
    });
  });
});
