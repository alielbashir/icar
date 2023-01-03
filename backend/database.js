const pg = require("pg");
const { MongoClient } = require("mongodb");

const clinet = new pg.Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "postgres",
  database: "icar",
});

let dbConnection;

const connectToMongo = async (connectionString) => {
  const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  dbConnection = client.db();
  return dbConnection;
};

const getDb = () => {
  return dbConnection;
};

module.exports = { clinet, connectToMongo, getDb };
