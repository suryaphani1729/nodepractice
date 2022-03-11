const path = require('path');
const os = require('os');
const fs = require('fs');

function message(msg) {
    console.log(msg);
    console.log(path.parse(__filename));
    console.log(path.parse(__dirname));
    console.log("Total Mem:"+os.totalmem());
    console.log("Free Mem:"+os.freemem());
    console.log("Files"+fs.readdirSync('./'));
}
module.exports = message;