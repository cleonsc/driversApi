const Log = require('log-color');

let logger = new Log({ level: 'debug', color: true });

function debug(text) {
    logger.debug(text);
}

function info(text) {
    logger.info(text);
}

function error(text) {
    logger.error(text);
}

function setTraceLevel(levelIN) {
    logger = new Log({ level: levelIN, color: true });
}

module.exports = {
    debug,
    info,
    error,
    setTraceLevel,
};