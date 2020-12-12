'use strict';

const _ = require('lodash');

const controllerHelper = require('../helpers/controller.helper');
const messageHelper = require('../helpers/message.helper');
const driverService = require('../services/driver.service');

// Module Name
const MODULE_NAME = '[Driver Controller]';

// Error Messages
const D_CT_ERR_DRIVER_NOT_FOUND = 'Driver not found';

// Success Messages
const D_CT_DELETED_SUCCESSFULLY = 'Driver deleted successfully';

function getDrivers(req, res) {
  try {
    // Receiving parameters
    const params = {
      name: req.swagger.params.name.value,
      sort: req.swagger.params.sort.value
    };

    // Call to service
    const result = driverService.getDrivers(params);

    // Returning the result
    res.json(result);
    
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getDrivers.name, error, res);
  }
}

function getDriverById(req, res) {

  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value
    };

    // Call to service
    const result = driverService.getDriverById(params.id);

    // Returning the result
    if (!_.isUndefined(result)) {
      res.json(result);
    } else {
      res.status(404).json(messageHelper.buildMessage(D_CT_ERR_DRIVER_NOT_FOUND))
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getDriverById.name, error, res);
  }
}

function createDriver(req, res) {

  try {
    // Receiving parameters
    const params = req.body;

    // Call to service
    const result = driverService.createDriver(params);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      res.status(201).json(result);
    } else {
      res.status(409).json(messageHelper.buildMessage(result.error)); //confict
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createDriver.name, error, res);
  }
}

function updateDriver(req, res) {

  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value
    };
    _.assign(params, req.body);

    // Call to service
    const result = driverService.updateDriver(params);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      res.json(result);
    } else {
      res.status(409).json(messageHelper.buildMessage(result.error));//conflict
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, updateDriver.name, error, res);
  }
}

function deleteDriver(req, res) {

  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value
    };

    // Call to service
    const result = driverService.deleteDriver(params.id);

    // Returning the result
    if (!_.isUndefined(result) && _.isUndefined(result.error)) {
      res.json({success:1, description: messageHelper.buildMessage(D_CT_DELETED_SUCCESSFULLY).message});
    } else {
      res.status(404).json({success:0, description: messageHelper.buildMessage(result.error)});//not found
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, deleteDriver.name, error, res);
  }
}

module.exports = {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver: deleteDriver,
  D_CT_ERR_DRIVER_NOT_FOUND,
  D_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}