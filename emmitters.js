const EventEmitter =  require('events');
const emitter = new EventEmitter();
emitter.on('messageLogged',function(message){
    console.log('Log:'+message);
})

class Logger extends EventEmitter {
    log(message) {
        this.emit('messageLogged',message);
    }
}
module.exports = Logger;