const { shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const AppInput = require(getSolutionPath('components/AppInput.vue')).default;

describe('deep-vue/AppInput', () => {
  describe('AppInput', () => {
    it('AppInput должен иметь параметры small, rounded и multiline', () => {
      const wrapper = shallowMount(AppInput);
      expect(wrapper.vm.$options.props.small.type).toBe(Boolean);
      expect(wrapper.vm.$options.props.rounded.type).toBe(Boolean);
      expect(wrapper.vm.$options.props.multiline.type).toBe(Boolean);
    });

    it('AppInput должен рендерить поле ввода с классом form-control внутри блока input-group', () => {
      const wrapper = shallowMount(AppInput);
      expect(wrapper.find('.input-group').exists()).toBe(true);
      expect(wrapper.find('.input-group input.form-control').exists()).toBe(
        true,
      );
    });

    it('AppInput должен иметь класс form-control_sm только с параметром small', async () => {
      const wrapper = shallowMount(AppInput);
      expect(wrapper.find('input').classes('form-control_sm')).toBe(false);
      await wrapper.setProps({ small: true });
      expect(wrapper.find('input').classes('form-control_sm')).toBe(true);
    });

    it('AppInput должен иметь класс form-control_rounded только с параметром rounded', async () => {
      const wrapper = shallowMount(AppInput);
      expect(wrapper.find('input').classes('form-control_rounded')).toBe(false);
      await wrapper.setProps({ rounded: true });
      expect(wrapper.find('input').classes('form-control_rounded')).toBe(true);
    });

    it('AppInput с параметром multiline должен рендерить многострочное поле ввода', () => {
      const wrapper = shallowMount(AppInput, {
        propsData: { multiline: true },
      });
      expect(wrapper.find('textarea.form-control').exists()).toBe(true);
    });

    it('Параметры small и rounded должны работать с многострочным AppInput', async () => {
      const wrapper = shallowMount(AppInput, {
        propsData: { multiline: true },
      });
      const textarea = wrapper.find('textarea.form-control');
      expect(textarea.classes('form-control_rounded')).toBe(false);
      expect(textarea.classes('form-control_sm')).toBe(false);
      await wrapper.setProps({ rounded: true, small: true });
      expect(textarea.classes('form-control_rounded')).toBe(true);
      expect(textarea.classes('form-control_sm')).toBe(true);
    });

    it('AppInput должен принимать различные атрибуты полей ввода', () => {
      const attrs = {
        placeholder: 'placeholder',
        id: 'id',
        maxlength: '100',
      };

      const wrapper = shallowMount(AppInput, {
        attrs,
      });
      expect(wrapper.find('.form-control').attributes()).toMatchObject(attrs);
      expect(wrapper.find('.input-group').attributes()).not.toMatchObject(attrs);
    });

    it('AppInput должен принимать различные атрибуты полей ввода для textarea', () => {
      const attrs = {
        placeholder: 'placeholder',
        id: 'id',
        rows: '3',
        cols: '4',
      };

      const wrapper = shallowMount(AppInput, {
        propsData: { multiline: true },
        attrs,
      });
      expect(wrapper.find('.form-control').attributes()).toMatchObject(attrs);
      expect(wrapper.find('.input-group').attributes()).not.toMatchObject(attrs);
    });

    it.each(['password', 'num', 'range', 'date', 'time', 'email', 'tel'])(
      'AppInput должен рендерить input type=(%s)',
      (type) => {
        const wrapper = shallowMount(AppInput, {
          attrs: {
            type,
          },
        });
        expect(wrapper.find('input.form-control').attributes('type')).toBe(
          type,
        );
      },
    );

    it.each([false, true])(
      'AppInput должен выводить текущее значение (multiline=%s)',
      async (multiline) => {
        const value = 'SampleText';
        const wrapper = shallowMount(AppInput, { propsData: { multiline } });
        const formControl = wrapper.find('.form-control');
        await wrapper.setProps({ value });
        expect(formControl.element.value).toBe(value);
      },
    );

    it('AppInput должен обрабатывать нативный ввод и порождать события input, change с введённым значением', async () => {
      const value = 'SampleText';
      const wrapper = shallowMount(AppInput);
      const formControl = wrapper.find('.form-control');
      await formControl.setValue(value);
      await formControl.trigger('change');
      expect(wrapper.emitted().input).toBeDefined();
      expect(wrapper.emitted().input).toHaveLength(1);
      expect(wrapper.emitted().input[0]).toEqual([value]);
      expect(wrapper.emitted().change).toBeDefined();
      expect(wrapper.emitted().change[0]).toEqual([value]);
    });

    it('AppInput должен выводить левую иконку и добавлять классы input-group_icon input-group_icon-left', async () => {
      const wrapper = shallowMount(AppInput, {
        slots: { 'left-icon': '<img class="icon icon-search" />' },
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.input-group').classes()).toEqual([
        'input-group',
        'input-group_icon',
        'input-group_icon-left',
      ]);
      expect(wrapper.find('img.icon-search + input').exists()).toBe(true);
    });

    it('AppInput должен выводить правую иконку и добавлять классы input-group_icon input-group_icon-right', async () => {
      const wrapper = shallowMount(AppInput, {
        slots: { 'right-icon': '<img class="icon icon-search" />' },
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.input-group').classes()).toEqual([
        'input-group',
        'input-group_icon',
        'input-group_icon-right',
      ]);
      expect(wrapper.find('input + img.icon-search').exists()).toBe(true);
    });
  });
});
