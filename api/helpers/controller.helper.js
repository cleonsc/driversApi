const _ = require('lodash');


function buildErrorResponse(nameController, nameMethod) {
	const jsonResultFailed = {
		error: {
			code: 500,
			message: 'Internal Server Error',
			description: `Internal Application Error in ${nameController}:${nameMethod}`,
		},
	};
	return jsonResultFailed;
}

function handleErrorResponse(controllerName, methodName, err, res) {
	const jsonResultFailed = buildErrorResponse(controllerName, methodName);
	res.status(500).send(jsonResultFailed);
}

module.exports = {
	buildErrorResponse,
	handleErrorResponse,
};