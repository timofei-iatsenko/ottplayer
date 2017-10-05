'use strict';

/**
 * Holds an environment config.
 *
 * To set environment use with CLI param `--env=DEV`
 *
 * All properties here can be overridden in local config:
 *
 * ```
 * // ./local-env-config.js
 *
 * module.exports = {
 *   IS_DEV: false,
 *};
 * ```
 */
const args = require('yargs').argv;
const path = require('path');

const env = args.env || 'dev';

let config = {
    base: '/',
    destination: `./dist`,
    IS_DEV: env.toLowerCase() === 'dev',
};

try {
    const localConfig = require(path.resolve('./local-env-config.js'));
    config = Object.assign(config, localConfig);
} catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
        throw err;
    }
}

module.exports = config;

