
var path = require('path');

var forgeEntryPoint = require.resolve('forge-ui');
var forgeDir = path.dirname(forgeEntryPoint);

var normalizeEntryPoint = require.resolve('node-normalize-scss');
var normalizeDir = path.dirname(normalizeEntryPoint);

function includePaths() {
  return [forgeDir, normalizeDir];
}

module.exports = {

  includePaths: includePaths()

};
