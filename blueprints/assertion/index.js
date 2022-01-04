const { dasherize, camelize } = require('ember-cli-string-utils');

module.exports = {
  description: 'Generates a new custom assertion into tests/assertions/',

  locals: function (options) {
    var entity = options.entity;
    var rawName = entity.name;
    var name = dasherize(rawName);
    var camelName = camelize(rawName);

    return {
      name: name,
      camelName: camelName,
    };
  },
};
