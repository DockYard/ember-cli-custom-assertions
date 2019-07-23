import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';

module('default setup', function(hooks) {
  setupTest(hooks);
  setupCustomAssertions(hooks);

  test('can inject custom assertions', function(assert) {
    assert.expect(2);
    assert.doubleTrouble();
  });
});

