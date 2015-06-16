module.exports = {
    env: {
        doc: 'The applicaton environment.',
        format: ['production', 'development', 'testing'],
        default: 'development',
        env: 'NODE_ENV'
    },
    mongoDb: {
        uri: {
            doc: 'The MongoDB connection string',
            format: String,
            default: null,  // required, must be set via env var
            env: 'MONGO_URL'
        },
        collection: {
            doc: 'Name of the collection where the logs are stored',
            format: String,
            default: 'eventLogs',
            env: 'EVENT_LOG_COLLECTION'
        }
    },
    logger: {
        level: {
            doc: 'The log level to output.',
            format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
            default: 'trace',
            env: 'LOG_LEVEL'
        },
        name: {
            doc: 'Logger name',
            format: String,
            default: 'mongodb-event-logger'
        },
        logStash: {
            host: {
                doc: 'The logstash host to connect to.',
                format: String,
                default: null,  // required, must be set via env var
                env: 'LOGSTASH_URL'
            },
            port: {
                doc: 'The logstash port to connect to (UDP).',
                format: Number,
                default: 5000
            },
            /* eslint-disable camelcase */
            max_connect_retries: {
            /* eslint-enable */
                doc: 'The amount of tries the logger tries to connect to logstash. -1 is infinte.',
                format: Number,
                default: -1
            }
        }
    }
};
