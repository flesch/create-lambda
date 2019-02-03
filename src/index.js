#!/usr/bin/env node

import { basename, resolve } from 'path';
import exportTemplate from 'template-dir';
import getopts from 'getopts';
import execa from 'execa';
import npmConf from 'npm-conf';
import username from 'username';

const conf = npmConf();

const { _ = [], template, ...options } = getopts(process.argv.slice(2), {
  default: {
    name: basename(process.cwd()),
    description: '',
    profile: 'default',
    region: 'us-east-1',
    template: 'function',
    user: username.sync(),
  },
});

exportTemplate(
  {
    source: resolve(__dirname, `../templates/${template}`),
    destination: process.cwd(),
  },
  {
    package: {
      name: options.name,
      description: options.description,
      user: options.user,
    },
    aws: {
      profile: options.profile,
      region: options.region,
    },
    init: {
      author: {
        name: conf.get('init.author.name'),
        email: conf.get('init.author.email'),
        url: conf.get('init.author.url') || `https://github.com/${options.user}`,
      },
      version: conf.get('init-version'),
    },
  },
);

execa('git', ['init']).stdout.pipe(process.stdout);
execa('npm', ['install']).stdout.pipe(process.stdout);
