const { getSolutionPath } = require('taskbook-test-utils');
const { shallowMount } = require('@vue/test-utils');
const FadeTransitionGroup = require(getSolutionPath(
  'components/FadeTransitionGroup',
)).default;

describe('deep-vue/Transitions-2', () => {
  describe('FadeTransitionGroup', () => {
    it('FadeTransitionGroup должен добавлять класс fade-list-item всем переданным в слот элементам', async () => {
      const wrapper = shallowMount(FadeTransitionGroup, {
        slots: {
          default: '<p key="1"><b>1</b></p><p key="2">2</p><p key="3">3</p>',
        },
      });
      const content = wrapper.findAll('p').wrappers;
      expect(content).toHaveLength(3);
      expect(content.every((p) => p.classes('fade-list-item'))).toBe(true);
      expect(wrapper.find('b').classes('fade-list-item')).toBe(false);
    });

    it('FadeTransitionGroup должен оставлять уже имеющиеся классы на переданных элементах', async () => {
      const wrapper = shallowMount(FadeTransitionGroup, {
        slots: {
          default:
            '<p class="class-a" key="a">a</p><p class="class-a class-b" key="ab">ab</p>',
        },
      });
      const content = wrapper.findAll('p').wrappers;
      expect(content.every((p) => p.classes('fade-list-item'))).toBe(true);
      expect(content[0].classes('class-a')).toBe(true);
      expect(content[1].classes('class-a')).toBe(true);
      expect(content[1].classes('class-b')).toBe(true);
    });

    it('FadeTransitionGroup должен реализовывать TransparentWrapper обёртку над TransitionGroup', async () => {
      const TransitionGroupStub = {
        props: ['tag'],
        render(h) {
          return h('div', this.$slots.default);
        },
      };

      const tag = 'section';
      const wrapper = shallowMount(FadeTransitionGroup, {
        propsData: { tag },
        slots: {
          default: '<p key="a">a</p><p key="b">b</p>',
        },
        stubs: { 'transition-group': TransitionGroupStub },
      });
      expect(wrapper.findComponent(TransitionGroupStub).props('tag')).toBe(tag);
    });
  });
});
