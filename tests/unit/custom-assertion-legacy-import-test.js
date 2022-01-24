import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { assertionInjector } from '../assertions';

module('assertions in new testing API using legacy imports', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    assertionInjector(this.owner);
  });

  test('can inject custom assertions', function (assert) {
    assert.expect(2);
    assert.doubleTrouble();
  });
});
