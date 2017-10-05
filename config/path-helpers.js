'use strict';

const path = require('path');

/**
 * Helper functions.
 */
module.exports = {
    root: path.join.bind(path, path.resolve(__dirname, '..')),
    relative: path.join.bind(path, __dirname),
};
