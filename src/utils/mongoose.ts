import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export const connectionDB = async () => {
  // return await mongoose.connection("mongodb:localhost/next-mongo-crud");

  if (conn.isConnected) return;
  const db = await connect("mongodb://localhost:27017/next-mongo-crud");
  conn.isConnected = true;
  console.log(db.connection.db.databaseName);
};

connection.on("connected", () => {
  console.log("MongoDB connected");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error", err);
});
