import VueRouter from 'vue-router';
import { createLocalVue, mount } from '@vue/test-utils';
import { router } from '../router';
import MeetupsView from '../components/MeetupsView';
const { getSolutionPath } = require('taskbook-test-utils');
const PageWithQuery = require(getSolutionPath('views/PageWithQuery')).default;

describe('SPA/Query', () => {
  describe('Работа с query параметрами', () => {
    const query = {
      search: 'search',
      view: 'calendar',
      participation: 'attending',
      date: 'future',
    };

    let localVue;
    let wrapper;
    let meetupsView;

    beforeEach(async () => {
      localVue = createLocalVue();
      localVue.use(VueRouter);
      await router.replace('/');
      wrapper = mount(PageWithQuery, { router, localVue });
      meetupsView = wrapper.findComponent(MeetupsView);
    });

    afterEach(() => {
      wrapper.destroy();
    });

    it('Значение параметров должно соответствовать значениям query параметров в маршруте', async () => {
      const localVue = createLocalVue();
      localVue.use(VueRouter);
      await router.replace({ path: '/', query });
      wrapper = mount(PageWithQuery, { router, localVue });
      meetupsView = wrapper.findComponent(MeetupsView);
      expect(meetupsView.props()).toMatchObject(query);
    });

    it('При изменении значения параметров должен меняться маршрут (push или query)', async () => {
      await wrapper.vm.$router.replace({ query });
      const values = {
        view: 'calendar',
        participation: 'organizing',
        date: 'past',
        search: 'abacaba',
      };
      Object.entries(values).forEach(([prop, value]) => {
        meetupsView.vm.$emit(`update:${prop}`, value);
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$route.query).toMatchObject(values);
    });

    it('При переходе на маршрут с другим query, должно обновлять соответствующие параметры', async () => {
      await wrapper.vm.$router.replace({ query });
      expect(meetupsView.props()).toMatchObject(query);
    });

    it('Если какой-то параметр меняется на значение по умолчанию, его не должно быть в query', async () => {
      await wrapper.vm.$router.replace({ query });
      const values = {
        view: 'list',
        participation: 'all',
        date: 'all',
        search: '',
      };
      Object.entries(values).forEach(([prop, value]) => {
        meetupsView.vm.$emit(`update:${prop}`, value);
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$route.query).toEqual({});
    });
  });
});
