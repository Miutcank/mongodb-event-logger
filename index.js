var config = require('./config');
var log = require('./utils/logger')();
var mongodb = require('./utils/mongodb')(config.mongoDb);

var eventLogger = module.exports = function mongoDbEventLoggerConstructor() {

  eventLogger.log = function logEvent(payload) {
    if (!typeof payload === 'object') {
      throw Error('Event must be an object');
    }
    if (!payload.userId) {
      log.warn('Event doesnt contain userId');
    }
    if (!payload.time) {
      payload.time = new Date();
    }
    return mongodb.insert(payload);
  };

  return eventLogger;
};
