// Node always wraps your javascript code in a module wrapper
// formatted as a functionx

const EventEmitter = require('events');

var url = "http://mylogger.io/log";

class Logger extends EventEmitter{
    log(message){
        this.emit('messageLogged', {id: 1, url: url, message: message});
    }
}


// Export the following properties/functions/variables to the public
module.exports = Logger;
//the above exports a single function, you can also export an object
// the object would have different properties
// e.g. module.exports.log = log 
// e.g. module.exports.url = url
