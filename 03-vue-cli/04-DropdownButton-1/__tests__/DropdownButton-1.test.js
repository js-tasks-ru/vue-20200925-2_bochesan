const { shallowMount, mount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const DropdownButton = require(getSolutionPath('components/DropdownButton'))
  .default;
const AppIcon = require('../components/AppIcon').default;

describe('vue-cli/DropdownButton-1', () => {
  describe('DropdownButton', () => {
    const icon = 'key';
    const optionsWithIcon = [
      { value: '1', text: 'one' },
      { value: '2', text: 'two', icon },
    ];
    const options = [
      { value: '1', text: 'one' },
      { value: '2', text: 'two' },
    ];
    const title = 'Some title';

    it('Компонент должен иметь параметры title, options, value', () => {
      const wrapper = shallowMount(DropdownButton, {
        propsData: { options, title },
      });
      expect(wrapper.vm.$options.props.value).toBeTruthy();
      expect(wrapper.vm.$options.props.title).toBeTruthy();
      expect(wrapper.vm.$options.props.options.type).toBe(Array);
      expect(wrapper.vm.$options.props.options.required).toBeTruthy();
    });

    it('Кнопка должна иметь текст с заголовком из параметра', () => {
      const wrapper = shallowMount(DropdownButton, {
        propsData: { options, title },
      });
      expect(wrapper.find('.dropdown__toggle').text()).toBe(title);
    });

    it('Кнопка должна иметь текст с заголовком и выбранным вариантом', () => {
      const wrapper = shallowMount(DropdownButton, {
        propsData: { options, title, value: '2' },
      });
      expect(wrapper.find('.dropdown__toggle').text()).toBe(`${title} - two`);
    });

    it('Компонент должен реагировать на изменение выбранного варианта', async () => {
      const wrapper = shallowMount(DropdownButton, {
        propsData: { options, title, value: '1' },
      });
      await wrapper.setProps({ value: '2' });
      expect(wrapper.find('.dropdown__toggle').text()).toBe(`${title} - two`);
    });

    it('Компонент должен показывать список скрытым, открывать его по клику и закрывать по повторному клику', async () => {
      const wrapper = shallowMount(DropdownButton, {
        propsData: { options, title },
      });
      const button = wrapper.find('.dropdown__toggle');
      expect(wrapper.find('.dropdown__menu').classes('show')).toBeFalsy();
      await button.trigger('click');
      expect(wrapper.find('.dropdown__menu').classes('show')).toBeTruthy();
      await button.trigger('click');
      expect(wrapper.find('.dropdown__menu').classes('show')).toBeFalsy();
    });

    it('Выбор вариант порождает событие change', async () => {
      const wrapper = shallowMount(DropdownButton, {
        propsData: { options, title },
      });
      await wrapper.find('.dropdown__toggle').trigger('click');
      await wrapper.find('.dropdown__item:nth-child(2)').trigger('click');
      expect(wrapper.emitted().change).toBeTruthy();
      expect(wrapper.emitted().change.length).toBe(1);
      expect(wrapper.emitted().change[0]).toEqual(['2']);
    });

    it('Список должен скрываться после выбора варианта', async () => {
      const wrapper = shallowMount(DropdownButton, {
        propsData: { options, title },
      });
      await wrapper.find('.dropdown__toggle').trigger('click');
      await wrapper.find('.dropdown__item:nth-child(2)').trigger('click');
      expect(wrapper.find('.dropdown__menu').classes('show')).toBeFalsy();
    });

    it('Должен быть класс dropdown__toggle_icon и иконка на кнопке выбранного варианта при наличии icon в списке вариантов', () => {
      const wrapper = mount(DropdownButton, {
        propsData: { options: optionsWithIcon, title, value: '2' },
      });
      expect(
        wrapper.find('.dropdown__toggle').classes('dropdown__toggle_icon'),
      ).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).props().icon).toBe(icon);
    });

    it('Должен быть класс dropdown__item_icon на все вариантах, если хотя бы у одного есть иконка', async () => {
      const wrapper = mount(DropdownButton, {
        propsData: { options: optionsWithIcon, title },
      });
      await wrapper.find('.dropdown__toggle').trigger('click');
      expect(
        wrapper
          .findAll('.dropdown__item')
          .wrappers.every((wrapper) => wrapper.classes('dropdown__item_icon')),
      ).toBeTruthy();
    });
  });
});
