/* global requirejs */
import { default as environment } from '../config/environment';
import { camelize } from '@ember/string';
import { A } from '@ember/array';

let assertionCache;

function assertions() {
  if (!assertionCache) {
    const { modulePrefix } = environment;
    const entries = A(Object.keys(requirejs.entries));
    const pattern = new RegExp(`^${modulePrefix}/tests/assertions/[\\w-]+$`);

    assertionCache = entries.reduce(function(entries, entry) {
      if (entry.match(pattern)) {
        let splitEntry = entry.split('/');
        let fn = requirejs(entry)['default'];

        entry = splitEntry[splitEntry.length - 1];
        entry = camelize(entry);
        entries[entry] = fn;
      }

      return entries;
    }, {});
  }

  return assertionCache;
}

function assertionInjector(context) {
  let _assertions = assertions();

  Object.keys(_assertions).forEach(function(assertion) {
    window.QUnit.assert[assertion] = function() {
      let fn = _assertions[assertion];
      let args = Array.prototype.slice.call(arguments);

      if (context) {
        args.unshift(context);
      }

      return fn.apply(this, args);
    };
  });
}

function assertionCleanup() {
  let _assertions = assertions();

  Object.keys(_assertions).forEach(function(assertion) {
    delete window.QUnit.assert[assertion];
  });
}

export { assertionInjector, assertionCleanup };
