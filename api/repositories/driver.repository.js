const _ = require('lodash');
const shortid = require('shortid');

const log = require('../helpers/log.helper');

// Name of the module
const MODULE_NAME = 'Driver Repository';

// Defines an initial set of drivers
let drivers = [];

function getDrivers(params) {
	log.debug(`${MODULE_NAME}:${getDrivers.name} (IN) -> params: ${JSON.stringify(params)}`);

	let driversResult = drivers.slice();

	// Filter by name
	if (params.name !== undefined) {
		driversResult = _.filter(drivers, { name: params.name });
	}

	// Order by name
	if (params.sort !== undefined) {
		if (params.sort === 'name') {
			driversResult = _.orderBy(driversResult, ['name'], ['asc']);
		} else if (params.sort === '-name') {
			driversResult = _.orderBy(driversResult, ['name'], ['desc']);
		}
	}

	// Returning result
	log.debug(`${MODULE_NAME}:${getDrivers.name} (OUT) -> result: ${JSON.stringify(driversResult)}`);
	return driversResult;
}

function getDriverById(id) {
	log.debug(`${MODULE_NAME}:${getDriverById.name} (IN) -> id: ${id}`);

	const result = drivers.find(element => element.id === id);

	log.debug(`${MODULE_NAME}:${getDriverById.name} (OUT) -> result: ${JSON.stringify(result)}`);
	return result;
}

function getDriverByName(name) {
	log.debug(`${MODULE_NAME}:${getDriverByName.name} (IN) -> name: ${name}`);

	const result = drivers.find(element => element.name === name);

	log.debug(`${MODULE_NAME}:${getDriverByName.name} (OUT) -> result: ${JSON.stringify(result)}`);
	return result;
}

function createDriver(driverParam) {
	log.debug(`${MODULE_NAME}:${createDriver.name} (IN) -> driver: ${driverParam}`);

	const newDriver = {
		id: shortid.generate(),
		name: driverParam.name,
		age: driverParam.age,
		phone: driverParam.phone,
		email: driverParam.email,
		patent: driverParam.patent,
		model: driverParam.model,
		year: driverParam.year
	};

	drivers.push(newDriver);

	const result = getDriverById(newDriver.id);

	log.debug(`${MODULE_NAME}:${createDriver.name} (OUT) -> result: ${result}`);
	return result;
}

function updateDriver(driverParam) {
	log.debug(`${MODULE_NAME}:${updateDriver.name} (IN) -> driver: ${driverParam}`);

	const idToSearch = driverParam.id;

	const driverToUpdate = getDriverById(idToSearch);

	if (driverToUpdate !== undefined) {
		driverToUpdate.name = driverParam.name,
		driverToUpdate.age = driverParam.age,
		driverToUpdate.phone = driverParam.phone,
		driverToUpdate.email = driverParam.email,
		driverToUpdate.patent = driverParam.patent,
		driverToUpdate.model = driverParam.model,
		driverToUpdate.year = driverParam.year
	}

	const result = driverToUpdate;

	log.debug(`${MODULE_NAME}:${updateDriver.name} (OUT) -> result: ${result}`);
	return result;
}

function deleteDriver(id) {
	log.debug(`${MODULE_NAME}:${deleteDriver.name} (IN) -> id: ${id}`);

	let result = false;

	const idToSearch = id;

	const driverToDelete = getDriverById(idToSearch);

	if (driverToDelete !== undefined) {
		_.remove(drivers, element => element.id === driverToDelete.id);
		result = true;
	}

	log.debug(`${MODULE_NAME}:${deleteDriver.name} (OUT) -> result: ${result}`);
	return result;
}

function initDefaultDrivers(driversSet) {
	log.debug(`${MODULE_NAME}:${initDefaultDrivers.name} (IN) -> driversSet: ${JSON.stringify(driversSet)}`);

	drivers = driversSet.slice();
}

module.exports = {
	getDrivers,
	getDriverById,
	getDriverByName,
	createDriver,
	updateDriver,
	deleteDriver,
	initDefaultDrivers,
};