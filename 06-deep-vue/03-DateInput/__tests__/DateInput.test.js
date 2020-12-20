const { mount, shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const DateInput = require(getSolutionPath('components/DateInput.vue')).default;

describe('deep-vue/DateInput', () => {
  describe('DateInput', () => {
    const date = new Date(Date.UTC(2020, 1, 1, 23, 32, 50));
    const YYYY = date.getUTCFullYear();
    const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const DD = date.getUTCDate().toString().padStart(2, '0');
    const hh = date.getUTCHours().toString().padStart(2, '0');
    const mm = date.getUTCMinutes().toString().padStart(2, '0');
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    const dateValue = `${YYYY}-${MM}-${DD}`;
    const timeValue = `${hh}:${mm}`;
    const timeWithSecondsValue = `${hh}:${mm}:${ss}`;
    const datetimeValue = `${dateValue}T${timeValue}`;

    it('DateInput должен иметь параметры type, valueAsDate и valueAsNumber', () => {
      const wrapper = shallowMount(DateInput);
      expect(wrapper.vm.$options.props.type.type).toBe(String);
      expect(wrapper.vm.$options.props.type.default).toBe('date');
      expect(wrapper.vm.$options.props.valueAsDate.type).toBe(Date);
      expect(wrapper.vm.$options.props.valueAsNumber.type).toBe(Number);
    });

    it.each(['date', 'time', 'datetime-local'])(
      'DateInput должен рендерить AppInput[type=%s]',
      (type) => {
        const wrapper = mount(DateInput, { propsData: { type } });
        const input = wrapper.find('input');
        expect(input.attributes('type')).toBe(type);
      },
    );

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии с valueAsDate в формате yyyy-mm-dd', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ valueAsDate: date });
      expect(wrapper.find('input').element.value).toBe(dateValue);
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с valueAsDate в формате hh:mm', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'time' } });
      await wrapper.setProps({ valueAsDate: date });
      expect(wrapper.find('input').element.value).toBe(timeValue);
    });

    it('DateInput[type=datetime-local] должен выводить поле ввода со значением в соответствии с valueAsDate в формате yyyy-mm-ddThh:mm', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      await wrapper.setProps({ valueAsDate: date });
      expect(wrapper.find('input').element.value).toBe(datetimeValue);
    });

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии с valueAsNumber в формате yyyy-mm-dd', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ valueAsNumber: +date });
      expect(wrapper.find('input').element.value).toBe(dateValue);
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с valueAsNumber в формате hh:mm', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'time' } });
      await wrapper.setProps({ valueAsNumber: +date });
      expect(wrapper.find('input').element.value).toBe(timeValue);
    });

    it('DateInput[type=datetime-local] должен выводить поле ввода со значением в соответствии с valueAsNumber в формате yyyy-mm-ddThh:mm', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      await wrapper.setProps({ valueAsNumber: +date });
      expect(wrapper.find('input').element.value).toBe(datetimeValue);
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с valueAsDate в формате hh:mm:ss, если атрибут step не кратен 60', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'time' },
        attrs: { step: 1 },
      });
      await wrapper.setProps({ valueAsDate: date });
      expect(wrapper.find('input').element.value).toBe(timeWithSecondsValue);
    });

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии valueAsNumber, если переданы и valueAsDate, и valueAsNumber, и value', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({
        value: '1990-01-01',
        valueAsDate: new Date(date).setMonth(date.getMonth() + 1),
        valueAsNumber: +date,
      });
      expect(wrapper.find('input').element.value).toBe(dateValue);
    });

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии value, если valueAsDate и valueAsNumber не переданы', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ value: dateValue });
      expect(wrapper.find('input').element.value).toBe(dateValue);
    });

    it('DateInput[type=date] должен синхронизировать параметры valueAsDate и valueAsNumber при вводе значения', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      wrapper.find('input').element.value = dateValue;
      wrapper.find('input').element.valueAsDate = date;
      wrapper.find('input').element.valueAsNumber = +date;
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted()['update:valueAsNumber'][0]).toEqual([+date]);
      expect(wrapper.emitted()['update:valueAsDate'][0]).toEqual([date]);
    });

    it('DateInput[type=datetime-local] должен синхронизировать параметры valueAsDate и valueAsNumber при вводе значения', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      wrapper.find('input').element.value = datetimeValue;
      wrapper.find('input').element.valueAsNumber = +date;
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted()['update:valueAsNumber'][0]).toEqual([+date]);
      expect(wrapper.emitted()['update:valueAsDate'][0]).toEqual([date]);
    });

    it('DateInput должен выводить левую иконку в AppInput через слот left-icon', async () => {
      const wrapper = mount(DateInput, {
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
  });
});
