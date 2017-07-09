var webClient = require('slack-terminalize').getWebClient();
/**
 * Wrapper function for postMessage from slack-client to handle formatting.
 * 
 * @param  { object } slack-client Channel boject
 * @param  { string } message to send to Slack channel
 * @param  { boolean } flag to indicate block formatting
 * @return { none }
 * 
 */
var postMessage = function (channel, response, format, attachments) {

	if (format) {
        response = (format && '```' + response + '```') || response;
    }

    // more on this API here: https://api.slack.com/methods/chat.postMessage
	webClient.chat.postMessage(channel, response, {
		as_user: true,
        attachments: attachments
	});

};

exports.postMessage = postMessage;