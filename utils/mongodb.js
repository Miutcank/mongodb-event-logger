/*
 *  MongoDB helper for event logger
 */

var Promise = require('bluebird');
var MongoDB = Promise.promisifyAll(require('mongodb'));
var MongoClient = Promise.promisifyAll(MongoDB.MongoClient);
var log = require('./logger')();

var mongoDbUtil = module.exports = function MongoDBConstructor(config) {

  MongoClient.connectAsync(config.uri)
    .then(function connectionEstablished(connection) {
      mongoDbUtil.connection = connection;
      mongoDbUtil.connected = true;
    })
    .catch(function errorInConnection(error) {
      log.error('Error in MongoDB connection', {error: error});
    });

  mongoDbUtil.getConnection = function getConnection() {
    if (mongoDbUtil.connection) {
      return Promise.resolve(mongoDbUtil.connection);
    } else {
      return Promise.delay(200).then(mongoDbUtil.getConnection);  // recursive wait
    }
  };

  mongoDbUtil.find = function find(query) {
    return mongoDbUtil.getConnection()
      .then(function gotConnection(connection) {
        return connection.collection(config.collection).find(query).toArrayAsync();
      });
  };

  mongoDbUtil.insert = function insert(data) {
    return mongoDbUtil.getConnection()
      .then(function gotConnection(connection) {
        return connection.collection(config.collection).insert(data);
      });
  };

  mongoDbUtil.aggregate = function aggregate(operators) {
    // TODO: check connection
    return mongoDbUtil.connection.collection(config.collection).aggregateAsync(operators);
  };

  return mongoDbUtil;
};
