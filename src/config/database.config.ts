import mongoose, { Connection, Mongoose } from 'mongoose';

export const connectToDatabase = async (): Promise<Connection> => {
  const { DATABASE_URI } = process.env;
  const { connection } = await mongoose.connect(<string>DATABASE_URI);
  console.log(`MongoDM connected: ${connection.host}`)
  return connection;
};