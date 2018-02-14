
var path = require('path');

var forgeEntryPoint = require.resolve('forge-ui');
var forgeDir = path.dirname(forgeEntryPoint.replace(/\/js/, '/sass'));

var normalizeEntryPoint = require.resolve('node-normalize-scss');
var normalizeDir = path.dirname(normalizeEntryPoint);

function styleIncludePath() {
  return [forgeDir, normalizeDir];
}

var iconDir = path.dirname(forgeEntryPoint.replace(/\/js/, '/icons'));

function iconIncludePath() {
  return `${iconDir}/*.svg`;
}

module.exports = {

  styles: styleIncludePath(),
  icons: iconIncludePath()

};
