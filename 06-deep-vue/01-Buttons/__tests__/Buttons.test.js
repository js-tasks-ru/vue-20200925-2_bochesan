const { shallowMount, mount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const BaseButton = require(getSolutionPath('components/BaseButton.vue'))
  .default;
const PrimaryButton = require(getSolutionPath('components/PrimaryButton.vue'))
  .default;
const SecondaryButton = require(getSolutionPath(
  'components/SecondaryButton.vue',
)).default;
const DangerButton = require(getSolutionPath('components/DangerButton.vue'))
  .default;

describe('deep-vue/Buttons', () => {
  const slots = { default: '<i>Italic Text</i>' };

  describe('BaseButton', () => {
    it('Компонент BaseButton должен иметь логический параметр block', () => {
      const wrapper = shallowMount(BaseButton);
      expect(wrapper.vm.$options.props.block.type).toBe(Boolean);
    });

    it('Компонент BaseButton должен иметь необязательный строковый параметр tag со значением button по умолчанию', () => {
      const wrapper = shallowMount(BaseButton);
      expect(wrapper.vm.$options.props.tag.type).toBe(String);
      expect(wrapper.vm.$options.props.tag.default).toBe('button');
    });

    it('Параметр tag у BaseButton должен иметь валидатор', () => {
      const wrapper = shallowMount(BaseButton);
      const validator = wrapper.vm.$options.props.tag.validator;
      expect(validator('button')).toBe(true);
      expect(validator('a')).toBe(true);
      expect(validator('router-link')).toBe(true);
      expect(validator('input')).toBe(false);
      expect(validator('anything')).toBe(false);
    });

    it('Компонент BaseButton должен рендерить своё содержимое', () => {
      const wrapper = shallowMount(BaseButton, { slots });
      expect(wrapper.find('button').html()).toContain(slots.default);
    });

    it('Компонент BaseButton должен иметь класс button_block только с параметром block', async () => {
      const wrapper = shallowMount(BaseButton);
      expect(wrapper.classes('button_block')).toBe(false);
      await wrapper.setProps({ block: true });
      expect(wrapper.classes('button_block')).toBe(true);
    });

    it('Компонент BaseButton должен рендерить ссылку с tag=a c переданными href и target', () => {
      const attrs = {
        href: 'https://course-vue.javascript.ru',
        target: '_blank',
      };
      const wrapper = shallowMount(BaseButton, {
        slots,
        attrs,
        propsData: { tag: 'a' },
      });
      const button = wrapper.find('a');
      expect(button.exists()).toBe(true);
      expect(button.attributes('href')).toBe(attrs.href);
      expect(button.attributes('target')).toBe(attrs.target);
    });

    it('Компонент BaseButton должен обрабатывать нативный клик', () => {
      const handler = jest.fn();
      const wrapper = shallowMount(BaseButton, {
        listeners: {
          click: () => handler(),
        },
      });
      wrapper.trigger('click');
      expect(handler).toHaveBeenCalled();
    });
  });

  describe.each`
    component          | name                 | buttonClass
    ${PrimaryButton}   | ${'PrimaryButton'}   | ${'button_primary'}
    ${SecondaryButton} | ${'SecondaryButton'} | ${'button_secondary'}
    ${DangerButton}    | ${'DangerButton'}    | ${'button_danger'}
  `('$name', ({ name, component, buttonClass }) => {
    it(`Компонент ${name} должен рендерить компонент BaseButton с теми же параметрами, обработчиками событий и содержимым`, async () => {
      const handler = jest.fn();
      const attrs = {
        href: 'https://course-vue.javascript.ru',
        target: '_blank',
      };
      const wrapper = mount(component, {
        slots,
        attrs,
        propsData: { tag: 'a' },
        listeners: {
          click: () => handler(),
        },
      });
      const subButton = wrapper.findComponent(BaseButton);
      expect(subButton.exists()).toBe(true);
      expect(subButton.props('tag')).toBe('a');
      await wrapper.trigger('click');
      expect(handler).toHaveBeenCalled();
    });

    it(`Компонент ${name} должен рендерить кнопку с классом ${buttonClass}`, () => {
      const wrapper = mount(component);
      expect(wrapper.classes(buttonClass)).toBe(true);
    });
  });
});
