import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

const connectDB = async () => {
  try {
    // Support both MONGO_URI and MONGODB_URI
    const connStr = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/hungerrush';
    
    // Attempt connecting to the provided MongoDB URI with 3s timeout
    try {
      const conn = await mongoose.connect(connStr, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (localErr) {
      console.log('Provided MongoDB URI not reachable, starting in-memory MongoDB Server for instant zero-config setup...');
    }

    // Fallback to high-performance MongoMemoryServer
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`InMemory MongoDB Server Connected: ${conn.connection.host} (${uri})`);

  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
