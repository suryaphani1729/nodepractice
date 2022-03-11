// const Logger = require('./emmitters');

// const logger = new Logger();
// logger.on('messageLogged',(arg) => {
//   console.log('Listener',arg);
// });
// logger.emit('messageLogged', "First message");
const http = require('http');
const server = http.createServer((req,res) => {
    res.write('Hello');
    res.end();
});
server.on('connection', (stream) => {
    console.log('someone connected!', stream);
  });
server.listen('3000')