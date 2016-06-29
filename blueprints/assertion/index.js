var stringUtil = require('ember-cli-string-utils');

module.exports = {
  description: 'Generates a new custom assertion into tests/assertions/',

  locals: function(options) {
    var entity    = options.entity;
    var rawName   = entity.name;
    var name      = stringUtil.dasherize(rawName);
    var camelName = stringUtil.camelize(rawName);

    return {
      name: name,
      camelName: camelName
    };
  }
}
