const express = require('express');
const SwaggerExpress = require('swagger-express-mw');
const healthcheck = require('express-healthcheck');

const log = require('../helpers/log.helper');

// Module Name
const MODULE_NAME = '[SwaggerExpress Bootstrap]';
// Default port
const DEFAULT_PORT = 8080;

let server;

// Start Express Server, configuring healthcheck, private routing and Install Middleware
async function start(appRoot, port) {
  return new Promise((resolve, reject) => {
    try {
      // Swagger config
      const config = { appRoot };

      // Instance Expresss
      const app = express();

      // Init Swagger
      SwaggerExpress.create(config, (err, swaggerExpress) => {
        if (err) {
          log.error(`${MODULE_NAME}:${start.name} (ERROR) --> error: ${err.stack}`);
          throw err;
        }

        const appPort = port || DEFAULT_PORT;
        module.exports.server = app.listen(appPort);

        // Healthcheck
        app.use('/healthcheck', healthcheck({
          healthy() {
            return { everything: 'is ok' };
          },
        }));

        // Install middleware
        swaggerExpress.register(app);

        log.info(`${MODULE_NAME}:${start.name} (OUT) --> App Server started at port: ${appPort} and Running OK!`);
        resolve(true);
      });
    } catch (error) {
      log.error(`${MODULE_NAME}:${start.name} (ERROR) --> error: ${error.stack}`);
      reject(new Error('Express did not start correctly!'));
    }
  });
}

function stop() {
  module.exports.server.close(() => { log.info(`${MODULE_NAME}:${stop.name} (OUT) --> App Server stopped`); });
}

module.exports = {
  server,
  start,
  stop,
};
