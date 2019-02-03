#!/usr/bin/env node
"use strict";

var _path = require("path");

var _templateDir = _interopRequireDefault(require("template-dir"));

var _getopts2 = _interopRequireDefault(require("getopts"));

var _execa = _interopRequireDefault(require("execa"));

var _npmConf = _interopRequireDefault(require("npm-conf"));

var _username = _interopRequireDefault(require("username"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const conf = (0, _npmConf.default)();

const _getopts = (0, _getopts2.default)(process.argv.slice(2), {
  default: {
    name: (0, _path.basename)(process.cwd()),
    description: '',
    profile: 'default',
    region: 'us-east-1',
    template: 'function',
    user: _username.default.sync()
  }
}),
      {
  _ = [],
  template
} = _getopts,
      options = _objectWithoutProperties(_getopts, ["_", "template"]);

(0, _templateDir.default)({
  source: (0, _path.resolve)(__dirname, `../templates/${template}`),
  destination: process.cwd()
}, {
  package: {
    name: options.name,
    description: options.description,
    user: options.user
  },
  aws: {
    profile: options.profile,
    region: options.region
  },
  init: {
    author: {
      name: conf.get('init.author.name'),
      email: conf.get('init.author.email'),
      url: conf.get('init.author.url') || `https://github.com/${options.user}`
    },
    version: conf.get('init-version')
  }
});
(0, _execa.default)('git', ['init']).stdout.pipe(process.stdout);
(0, _execa.default)('npm', ['install']).stdout.pipe(process.stdout);