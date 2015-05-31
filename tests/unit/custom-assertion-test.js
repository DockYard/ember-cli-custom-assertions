import { module, test } from 'qunit';
import { assertionInjector } from '../assertions';

module('assertions', {
  beforeEach() {
    assertionInjector();
  }
});

test('can inject custom assertions', function(assert) {
  assert.expect(2);

  assert.doubleTrouble();
});
