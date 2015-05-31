import Ember from 'ember';
import { default as environment } from '../config/environment';

const {
  camelize
} = Ember.String;

let assertionCache;

function assertions() {
  if (!assertionCache) {
    const { modulePrefix } = environment;
    const entries = Ember.A(Object.keys(requirejs.entries));
    const pattern = new RegExp(`^${modulePrefix}/tests/assertions/[\\w-]+$`);

    const _assertions = entries.filter(function(entry) {
      return entry.match(pattern);
    });

    assertionCache = _assertions.reduce(function(entries, entry) {
      let splitEntry = entry.split('/');
      let fn = requirejs(entry)['default'];

      entry = splitEntry[splitEntry.length - 1];
      entry = camelize(entry);
      entries[entry] = fn;

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

      args.unshift(context);

      return fn.apply(this, args);
    };
  });
}

function assertionCleanup() {
  let _assertions = assertions();

  Object.keys(_assertions).forEach(function(assertion) {
    delete window.QUnit.assert[assertions];
  });
}

export { assertionInjector, assertionCleanup };
