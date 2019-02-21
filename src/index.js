#!/usr/bin/env node

import { basename, resolve } from 'path';
import meow from 'meow';
import projectTemplate from 'project-template';
import on from 'await-handler';
import { name, email, url } from 'user-meta';
import username from 'github-username';

(async () => {
  const [, github = ''] = await on(username(email));
  const [err, files] = await on(
    projectTemplate({
      templatePath: resolve(__dirname, `../templates/function`),
      buildPath: process.cwd(),
      params: {
        'package.json': {},
        'README.md': {
          project: {
            name: 'HELLO_WORLD',
            description: 'hello',
          },
          author: {
            name,
            email,
            url,
          },
          year: new Date().getFullYear(),
        },
      },
    }),
  );
  console.log({ err, files });
})();

// import getopts from 'getopts';

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
