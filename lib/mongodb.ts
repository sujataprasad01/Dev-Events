// lib/mongodb.ts
import mongoose from "mongoose";

/**
 * Global cache interface to store the MongoDB connection
 * across hot reloads in development. This prevents creating
 * multiple connections and avoids performance issues.
 */
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Extend globalThis type so TS does not complain
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Initialize the cache if it does not exist
const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

/**
 * Connects to MongoDB using Mongoose.
 * Connection is cached to avoid multiple connections during development.
 */
export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("❌ Missing MONGODB_URI in environment variables");
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "myapp", // optional: customize your DB name
      })
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
