const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    transports: [
        new transports.File({
            filename: './logs/info.log',
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
                format.json()),
        }),
        new transports.File({
            filename: './logs/error.log',
            level: 'error',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
                format.json()),
        })
    ]
});

module.exports = logger;