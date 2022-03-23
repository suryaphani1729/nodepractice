const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const db = config.get('db');
const logger = winston.createLogger({transports: [new winston.transports.File({filename:'logfile.log'}),
new winston.transports.MongoDB({db:db, useUnifiedTopology: true})
]});
logger.add(new winston.transports.Console({
  colorize:true,
  prettyPrint:true,
    format: winston.format.simple(),
  }));

module.exports = function(error, req,res,next) {
    res.status(500).send("Something wrongs");
    logger.info(error.message);
    console.log("Something wrongs"); 
    console.log(error);
    next();
    
}