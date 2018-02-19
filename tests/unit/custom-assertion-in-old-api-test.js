import { module, test } from 'qunit';
import { assertionInjector } from '../assertions';

module('assertions in old testing API', {
  beforeEach() {
    assertionInjector();
  }
});

test('can inject custom assertions', function(assert) {
  assert.expect(2);

  assert.doubleTrouble();
});
