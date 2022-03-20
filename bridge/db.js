import { MongoClient } from "mongodb";

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

export { connectToMongo, getDb };