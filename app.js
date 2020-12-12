const log = require('./api/helpers/log.helper');

const swaggerExpressBootstrap = require('./api/bootstrap/swaggerExpress.bootstrap');

const MODULE_NAME = '[Main App]';
const appRoot = __dirname;


function logAppStarted(functionName) {
  log.info(`${MODULE_NAME} ${functionName}`);
  log.info(`${MODULE_NAME} ${functionName} -------------------------------------------------------------------------`);
  log.info(`${MODULE_NAME} ${functionName} --                         Drivers App Initialized OK!                         --`);
  log.info(`${MODULE_NAME} ${functionName} -------------------------------------------------------------------------`);
}

async function init() {
  try {
    log.info(`${MODULE_NAME}:${init.name} (IN) --> starting}`);

    await swaggerExpressBootstrap.start(appRoot, process.env.NODE_PORT);

    logAppStarted(init.name);

    return true;
  } catch (error) {
    log.error(`${MODULE_NAME}:${init.name} (ERROR) --> error: ${error.message}`);
    return false;
  }
}

function stop() {
  swaggerExpressBootstrap.stop();
}

// The application starts here when this module is loaded!
init();

module.exports = {
  init,
  stop,
};

