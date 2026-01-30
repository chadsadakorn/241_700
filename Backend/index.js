const http = require('http');
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res){
    res.write(200);
    res.end("Hello, World! This my frist server.");
}
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Sever is running on http://${host}:${port}`);
});