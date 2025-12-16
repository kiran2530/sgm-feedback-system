import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DBNAME = process.env.MONGODB_DBNAME || "feedback_system";

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing — please add it to .env.local");
}

declare global {
  var _mongoose:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      }
    | undefined;
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<mongoose.Connection> {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: MONGODB_DBNAME,
        bufferCommands: false,
      })
      .then((mongoose) => mongoose.connection);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
