const { shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const FormGroup = require(getSolutionPath('components/FormGroup')).default;

describe('vue-cli/FormGroup', () => {
  describe('FormGroup', () => {
    const slots = { default: '<div class="test-div">TEST_DIV</div>' };
    const label = 'TestLabel';

    it('FormGroup должен иметь параметры inline, label', async () => {
      const wrapper = shallowMount(FormGroup);
      expect(wrapper.vm.$options.props.inline).toBeTruthy();
      expect(wrapper.vm.$options.props.inline.type).toBe(Boolean);
      expect(wrapper.vm.$options.props.label).toBeTruthy();
      expect(wrapper.vm.$options.props.label.type).toBe(String);
    });

    it('FormGroup должен выводить содержимое в блоке .form-group', async () => {
      const wrapper = shallowMount(FormGroup, { slots });
      expect(wrapper.classes()).toEqual(['form-group']);
      expect(wrapper.find('.form-group').element.innerHTML).toContain(
        slots.default,
      );
    });

    it('FormGroup не должен выводить label по умолчанию', async () => {
      const wrapper = shallowMount(FormGroup, { slots });
      expect(wrapper.find('label').exists()).toBe(false);
    });

    it('FormGroup должен выводить label со значением параметра', async () => {
      const wrapper = shallowMount(FormGroup, { propsData: { label } });
      const labelWrapper = wrapper.find('label');
      expect(labelWrapper.exists()).toBe(true);
      expect(labelWrapper.classes()).toEqual(['form-label']);
      expect(labelWrapper.text()).toBe(label);
    });

    it('FormGroup должен выводить слот после label', async () => {
      const wrapper = shallowMount(FormGroup, { slots, propsData: { label } });
      expect(wrapper.find('label + .test-div').exists()).toBe(true);
    });
  });
});
