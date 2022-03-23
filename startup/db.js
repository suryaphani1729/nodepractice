const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
const logger = winston.createLogger({transports: [new winston.transports.File({filename:'logfile.log'}),
],
useUnifiedTopology: true,
  exitOnError: false });
logger.add(new winston.transports.Console({
    colorize:true,
    prettyPrint:true,
    format: winston.format.simple(),
  }));

module.exports = function() {
  const db = config.get('db');
    mongoose.connect(db, {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(()=> logger.info(`DB Connected -- ${db}`))
    .catch(err => logger.error(err));

}