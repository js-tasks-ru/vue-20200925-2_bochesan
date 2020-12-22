const { getSolutionPath } = require('taskbook-test-utils');
const MiniMessenger = require(getSolutionPath('components/MiniMessenger'))
  .default;

describe('deep-vue/nextTick', () => {
  describe('MiniMessenger', () => {
    it('MiniMessenger добавлен, но требует ручной проверки', async () => {
      expect(MiniMessenger).toBeDefined();
    });
  });
});
