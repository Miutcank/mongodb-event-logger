# mongodb-event-logger
General event logging and querying util that uses MongoDB as storage

## ENV vars

`NODE_ENV` *development*, testing or production

`MONGO_URL` MongoDB connection string

`EVENT_LOG_COLLECTION` Name of the collection where the logs are stored (default: eventLogs)

`LOG_LEVEL` *trace*, debug, info, warn, error or fatal

`LOGSTASH_URL` URL or IP of Logstash server where the modul will send the logs

`LOGSTASH_PORT` Port of Logstash connection
