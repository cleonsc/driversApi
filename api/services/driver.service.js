const _ = require('lodash');

const driverRepository = require('../repositories/driver.repository.js');
const messageHelper = require('../helpers/message.helper');
const log = require('../helpers/log.helper');

// Name of the module
const MODULE_NAME = '[Driver Service]';

// Error Messages
const D_SVC_ERR_CREATE_D_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create driver. There is a driver with the same name in the system';
const D_SVC_ERR_UPDATE_D_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to update driver. There is a driver with the same name to update in the system';
const D_SVC_ERR_UPDATE_D_NOT_FOUND_BY_ID = 'Not possible to update driver. There is NOT a driver with the same id to update';
const D_SVC_ERR_DELETE_D_NOT_FOUND_BY_ID = 'Not possible to delete driver. Driver not found';


function getDrivers(params) {
	log.debug(`${MODULE_NAME}:${getDrivers.name} (IN) -> params: ${JSON.stringify(params)}`);

	const result = driverRepository.getDrivers(params);

	log.debug(`${MODULE_NAME}:${getDrivers.name} (OUT) -> result: ${JSON.stringify(result)}`);
	return result;
}

function getDriverById(id) {
	log.debug(`${MODULE_NAME}:${getDriverById.name} (IN) -> id: ${id}`);

	const result = driverRepository.getDriverById(id);

	log.debug(`${MODULE_NAME}:${getDriverById.name} (OUT) -> result: ${JSON.stringify(result)}`);
	return result;
}

function getDriverByName(name) {
	log.debug(`${MODULE_NAME}:${getDriverByName.name} (IN) -> name: ${name}`);

	const result = driverRepository.getDriverByName(name);

	log.debug(`${MODULE_NAME}:${getDriverByName.name} (OUT) -> result: ${JSON.stringify(result)}`);
	return result;
}

function createDriver(params) {
	log.debug(`${MODULE_NAME}:${createDriver.name} (IN) -> params: ${JSON.stringify(params)}`);

	let result;

	// Checks if exists a driver with the same name - Using module.exports
	// to call the function to ease the testing
	const driverFound = module.exports.getDriverByName(params.name);

	if (_.isUndefined(driverFound)) {
		result = driverRepository.createDriver(params);
	} else {
		result = messageHelper.buildErrorMessage(D_SVC_ERR_CREATE_D_ALREADY_EXISTS_WITH_SAME_NAME);
	}

	log.debug(`${MODULE_NAME}:${createDriver.name} (OUT) -> result: ${JSON.stringify(result)}`);
	return result;
}

function updateDriver(params) {
	log.debug(`${MODULE_NAME}:${updateDriver.name} (IN) -> params: ${JSON.stringify(params)}`);

	let result;

	// Checks if exists a driver with the same id - Using module.exports
	// to call the function to ease the testing
	const driverFoundById = module.exports.getDriverById(params.id);
	if (!_.isUndefined(driverFoundById)) {
		// Then checks if exists a driver with the same name.
		// If exists, the id must be the same that the object in params
		const driverFoundByName = module.exports.getDriverByName(params.name);

		if (_.isUndefined(driverFoundByName) || driverFoundByName.id === params.id) {
			result = driverRepository.updateDriver(params);
		} else {
			result = messageHelper.buildErrorMessage(D_SVC_ERR_UPDATE_D_ALREADY_EXISTS_WITH_SAME_NAME);
		}
	} else {
		result = messageHelper.buildErrorMessage(D_SVC_ERR_UPDATE_D_NOT_FOUND_BY_ID);
	}

	log.debug(`${MODULE_NAME}:${updateDriver.name} (OUT) -> result: ${JSON.stringify(result)}`);
	return result;
}

function deleteDriver(id) {
	log.debug(`${MODULE_NAME}:${deleteDriver.name} (IN) -> id: ${id}`);

	let result;

	// First obtains the driver
	const myDriver = module.exports.getDriverById(id);

	if (!_.isUndefined(myDriver)) {
		const resultDeletion = driverRepository.deleteDriver(id);
		if (resultDeletion) {
			result = true;
		} else {
			result = messageHelper.buildErrorMessage(D_SVC_ERR_DELETE_D_NOT_FOUND_BY_ID);
		}
	} else {
		result = messageHelper.buildErrorMessage(D_SVC_ERR_DELETE_D_NOT_FOUND_BY_ID);
	}

	log.debug(`${MODULE_NAME}:${deleteDriver.name} (OUT) -> result: ${JSON.stringify(result)}`);
	return result;
}

module.exports = {
	getDrivers,
	getDriverById,
	getDriverByName,
	createDriver,
	updateDriver,
	deleteDriver,
	D_SVC_ERR_CREATE_D_ALREADY_EXISTS_WITH_SAME_NAME,
	D_SVC_ERR_UPDATE_D_ALREADY_EXISTS_WITH_SAME_NAME,
	D_SVC_ERR_UPDATE_D_NOT_FOUND_BY_ID,
	D_SVC_ERR_DELETE_D_NOT_FOUND_BY_ID
};