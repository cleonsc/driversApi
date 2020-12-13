const log = require('./api/helpers/log.helper');

const swaggerExpressBootstrap = require('./api/bootstrap/swaggerExpress.bootstrap');

const MODULE_NAME = '[Main App]';
const appRoot = __dirname;

async function init() {
  try {
    log.info(`${MODULE_NAME}:${init.name} (IN) --> starting}`);

    await swaggerExpressBootstrap.start(appRoot, process.env.NODE_PORT);

    return swaggerExpressBootstrap.server;
  } catch (error) {
    log.error(`${MODULE_NAME}:${init.name} (ERROR) --> error: ${error.message}`);
    return false;
  }
}

function stop() {
  swaggerExpressBootstrap.stop();
}

init();

module.exports = {
  init,
  stop,
  log
};

