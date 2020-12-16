import { RouterLinkStub, shallowMount } from '@vue/test-utils';
const { getSolutionPath } = require('taskbook-test-utils');
const TheHeader = require(getSolutionPath('components/TheHeader')).default;
const TheFooter = require(getSolutionPath('components/TheFooter')).default;
const BaseLayout = require(getSolutionPath('components/BaseLayout')).default;
const FormLayout = require(getSolutionPath('components/FormLayout')).default;
const AuthLayout = require(getSolutionPath('components/AuthLayout')).default;

describe('SPA/Layouts', () => {
  describe('Layouts', () => {
    it('TheHeader не должен быть пустым', async () => {
      expect(
        shallowMount(TheHeader, { stubs: { RouterLink: RouterLinkStub } })
          .element.innerHTML,
      ).toBeTruthy();
    });

    it('TheFooter не должен быть пустым', async () => {
      expect(shallowMount(TheFooter).element.innerHTML).toBeTruthy();
    });

    it('BaseLayout не должен быть пустым', async () => {
      expect(shallowMount(BaseLayout).element.innerHTML).toBeTruthy();
    });

    it('FormLayout не должен быть пустым', async () => {
      expect(shallowMount(FormLayout).element.innerHTML).toBeTruthy();
    });

    it('AuthLayout не должен быть пустым', async () => {
      expect(shallowMount(AuthLayout).element.innerHTML).toBeTruthy();
    });
  });
});
