const { getSolutionPath } = require('taskbook-test-utils');
const FadeTransition = require(getSolutionPath('components/FadeTransition'))
  .default;
const FadeTransitionGroup = require(getSolutionPath(
  'components/FadeTransitionGroup',
)).default;

describe('deep-vue/Transitions-1', () => {
  describe('FadeTransition', () => {
    it('FadeTransition добавлен, но требует ручной проверки', async () => {
      expect(FadeTransition).toBeDefined();
    });
  });

  describe('FadeTransitionGroup', () => {
    it('FadeTransitionGroup добавлен, но требует ручной проверки', async () => {
      expect(FadeTransitionGroup).toBeDefined();
    });
  });
});
