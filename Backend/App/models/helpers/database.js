const { Client } = require("pg");


const client = new Client();
// connected
client.connect();

module.exports = client;  


