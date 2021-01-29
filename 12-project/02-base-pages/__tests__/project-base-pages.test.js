const { getSolutionPath } = require('taskbook-test-utils');
const { LINK } = require(getSolutionPath('index'));

describe('project/base-pages', () => {
  test('Файл index.js должен содержать ссылку на репозиторий с проектом с основами всех страниц', () => {
    expect(LINK).toBeTruthy();
  });
});
