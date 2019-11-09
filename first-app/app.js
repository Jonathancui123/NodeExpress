const http = require('http');

const server = http.createServer((req,res) => {
    if (req.url === '/'){
        res.write('Hello world');
        res.end();
    }
    if (req.url === '/baby'){
        res.write('Hi baby ^_^ ily');
        res.end();
    }
}); // Servers are very similar to an 'event emitter'

server.listen(3000);

console.log('Listening on port 3000...');