const envConfig = require('./config/env-config');

module.exports = envConfig.IS_DEV ? require('./config/webpack.dev') : require('./config/webpack.prod');
