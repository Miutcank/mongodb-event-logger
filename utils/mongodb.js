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

  mongoDbUtil.find = function find(query) {
    // TODO: check connection
    return mongoDbUtil.connection.collection(config.collection).find(query).toArrayAsync();
  };

  mongoDbUtil.insert = function insert(data) {
    // TODO: check connection
    return mongoDbUtil.connection.collection(config.collection).insert(data);
  };

  return mongoDbUtil;
};