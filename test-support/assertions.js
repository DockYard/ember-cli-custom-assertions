import {
  assertionInjector as _assertionInjector,
  assertionCleanup,
} from 'ember-cli-custom-assertions/test-support';
import { deprecate } from '@ember/debug';
import config from '../config/environment';

function assertionInjector(context) {
  deprecate(
    'Importing assertionInjector and assertionCleanup from application namespace is deprecated.',
    false,
    {
      id: 'ember-cli-custom-assertions.test-support',
      since: '0.2.0',
      until: '1.0.0',
      for: 'ember-cli-custom-assertions',
    }
  );

  if (!context) {
    deprecate(
      'Calling assertionInjector without providing a context is deprecated.',
      false,
      {
        id: 'ember-cli-custom-assertions.missing-context',
        since: '0.2.0',
        until: '1.0.0',
        for: 'ember-cli-custom-assertions',
      }
    );

    // mock context for legacy support
    context = {
      isMocked: true,
      resolveRegistration() {
        return config;
      },
    };
  }

  _assertionInjector(context);
}

export { assertionInjector, assertionCleanup };
