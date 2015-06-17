var config = require('./config');
var log = require('./utils/logger')();
var mongodb = require('./utils/mongodb')(config.mongoDb);

var eventLogger = module.exports = function mongoDbEventLoggerConstructor() {

  eventLogger.log = function logEvent(payload) {
    if (!typeof payload === 'object') {
      throw Error('Event must be an object');
    }
    if (!payload.event || typeof payload.event !== 'string' ) {
      log.warn('Event object doesnt contain an event string');
    }
    if (!payload.userId) {
      log.warn('Event object doesnt contain userId');
    }
    if (!payload.time) {
      payload.time = new Date();
    }
    return mongodb.insert(payload);
  };

  eventLogger.getLogs = function getLogs(eventName) {
    return mongodb.find({ event: eventName });
  };

  eventLogger.getAggregatedEventCounts = function getAggregatedEventCounts(eventName, groupQuery) {
    return mongodb.aggregate([
      { $match: { event: eventName } },
      { $group: {
          _id: groupQuery,
          count: { $sum: 1 }
      }}
    ]);
  };

  return eventLogger;
};
