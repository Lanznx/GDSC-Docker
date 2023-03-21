const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017"; // mongodb://{這邊要加網路ip}:27017 
const client = new MongoClient(uri, { useNewUrlParser: true });
const collection = client.db("test").collection("monkey"); // test db 中的 monkey collection

module.exports = { collection };
