'use strict';

import { name, version } from './package.json';

const { NODE_ENV = 'development' } = process.env;

export const handler = (event, { awsRequestId, functionName, functionVersion }, callback) => {
  callback(null, {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ NODE_ENV, name, version, awsRequestId, functionName, functionVersion }, null, 2),
  });
};
