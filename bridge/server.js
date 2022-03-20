import { connect as connectToRabbitmq } from "amqplib";
import { connectToMongo } from "./db.js";

// connect to mongodb
const db = await connectToMongo("mongodb://mongodb:27017/icarDB");
console.log("mongoDB connection established!");

const rabbitmqConnection = await connectToRabbitmq("amqp://mq:5672");
console.log("rabbitmq connection established!");

const handleMessage = async (message) => {
  // console.log(`${message.content.toString()}`);
  const record = JSON.parse(message.content);
  db.collection("locations").insertOne(record, (err) => {
    if (err) {
      console.log("Error inserting location record!");
    } else {
      console.log(`Added a new location with id ${record.id}`);
    }
  });
};

const connect = async () => {
  try {
    const channel = await rabbitmqConnection.createChannel();
    var exchange = "cars";
    await channel.assertExchange(exchange, "fanout", {
      durable: true,
    });
    const q = await channel.assertQueue("", { exclusive: true });
    channel.bindQueue(q.queue, exchange, "");

    channel.consume(q.queue, handleMessage, {
      noAck: true,
    });
    // receive msg object to jobs queue
    console.log("Waiting for messages...");
  } catch (ex) {
    console.error(ex);
  }
};

connect();
