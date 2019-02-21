#!/usr/bin/env node
"use strict";

var _path = require("path");

var _meow = _interopRequireDefault(require("meow"));

var _projectTemplate = _interopRequireDefault(require("project-template"));

var _awaitHandler = _interopRequireDefault(require("await-handler"));

var _userMeta = require("user-meta");

var _githubUsername = _interopRequireDefault(require("github-username"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  const [, github = ''] = await (0, _awaitHandler.default)((0, _githubUsername.default)(_userMeta.email));
  const [err, files] = await (0, _awaitHandler.default)((0, _projectTemplate.default)({
    templatePath: (0, _path.resolve)(__dirname, `../templates/function`),
    buildPath: process.cwd(),
    params: {
      'package.json': {},
      'README.md': {
        project: {
          name: 'HELLO_WORLD',
          description: 'hello'
        },
        author: {
          name: _userMeta.name,
          email: _userMeta.email,
          url: _userMeta.url
        },
        year: new Date().getFullYear()
      }
    }
  }));
  console.log({
    err,
    files
  });
})(); // import getopts from 'getopts';
// const { _ = [], template, ...options } = getopts(process.argv.slice(2), {
//   default: {
//     name: basename(process.cwd()),
//     description: '',
//     profile: 'default',
//     region: 'us-east-1',
//     template: 'function',
//     user: username.sync(),
//   },
// });
//
// exportTemplate(
//   {
//     source: resolve(__dirname, `../templates/${template}`),
//     destination: process.cwd(),
//   },
//   {
//     package: {
//       name: options.name,
//       description: options.description,
//       user: options.user,
//     },
//     aws: {
//       profile: options.profile,
//       region: options.region,
//     },
//     init: {
//       author: {
//         name: conf.get('init.author.name'),
//         email: conf.get('init.author.email'),
//         url: conf.get('init.author.url') || `https://github.com/${options.user}`,
//       },
//       version: conf.get('init-version'),
//     },
//   },
// );
// execa('git', ['init']).stdout.pipe(process.stdout);
// execa('npm', ['install']).stdout.pipe(process.stdout);