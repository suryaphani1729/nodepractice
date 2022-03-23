const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const db = config.get('db');
const logger = winston.createLogger({transports: [new winston.transports.File({filename:'logfile.log'}),
new winston.transports.MongoDB({db:db, useUnifiedTopology: true})
],
exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' }),
    new winston.transports.MongoDB({db:db, useUnifiedTopology: true})
  ],
useUnifiedTopology: true,
  exitOnError: false });
logger.add(new winston.transports.Console({
    colorize:true,
    prettyPrint:true,
    format: winston.format.simple(),
  }));
  startupDebugger("I am startup debugger only print environment variable DEBUG=app:startup");
  dbDebugger("I am db debugger only print environment variable DEBUG=app:db");

module.exports = function() {
    process.on('uncaughtException', (ex) => {
        logger.log(ex);
    });
    
    process.on('unhandledRejection',(ex) => {
        logger.log(ex);
    });

}