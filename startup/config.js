const config = require('config');
module.exports = function(app) {

    console.log(`Node ENV ${process.env.NODE_ENV}`);
    console.log(`Node ENV ${app.get('env')}`);
    console.log(`Process ${config.get('name')}`);

    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: JWT private key not defined'); 
        //process.exit(1);
    }
    
}