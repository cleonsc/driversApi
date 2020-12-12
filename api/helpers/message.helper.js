const TITLE_ERROR = 'error';
const TITLE_MESSAGE = 'message';

function buildGenericMessage(nameMessage, textMessage) {
	const jsonMessageResult = {};
	jsonMessageResult[nameMessage] = textMessage;
	return jsonMessageResult;
}

function buildErrorMessage(text) {
	const jsonErrorMessage = buildGenericMessage(TITLE_ERROR, text);
	return jsonErrorMessage;
}

function buildMessage(text) {
	const jsonErrorMessage = buildGenericMessage(TITLE_MESSAGE, text);
	return jsonErrorMessage;
}

module.exports = {
	buildGenericMessage,
	buildErrorMessage,
	buildMessage,
};