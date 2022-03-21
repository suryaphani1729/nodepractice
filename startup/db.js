const winston = require('winston');
const mongoose = require('mongoose');
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
    mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(()=> logger.info("DB Connected"))
    .catch(err => logger.error(err));

}