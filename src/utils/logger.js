const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            filename: './logs/info.log',
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()),
        }),
        new transports.File({
            filename: './logs/error.log',
            level: 'error',
            format: format.combine(
                format.timestamp(),
                format.json()),
        })
    ]
});

module.exports = logger;