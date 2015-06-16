var config = require('../config').logger;
var bunyan = require('bunyan');

module.exports = function createLogger(){
	var logger = bunyan.createLogger({
		name: 'mongodb-event-logger',
		streams: [
			{
				type: 'raw',
				stream: require('bunyan-logstash-tcp').createStream({
					host: config.logStash.host,
					port: config.logStash.port,
					tags: ['bunyan']
				})
				.on('error', function func(err) {
					/* eslint-disable */
					console.error('[mongodb-event-logger] Error in bunyan-logstash-tcp stream');
					console.error(err);
					/* eslint-enable */
				})
			}, {
				stream: process.stdout
			}
		]
	});
	return logger;
};
