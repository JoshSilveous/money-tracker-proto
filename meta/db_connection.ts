import mongoose from 'mongoose'

const MONGO_IP = 'localhost'
const MONGO_USERNAME = 'db-connect'
const MONGO_PASSWORD = 'db-connect'
const MONGO_CREDENTIAL_DB = 'admin'

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}?authSource=${MONGO_CREDENTIAL_DB}`

console.log('Connecting to MongoDB...')
export const dbConnection = mongoose.createConnection(uri)
console.log('MongoDB connected')

// this function is ran when server starts (instrumentation.ts), kicking off the above code
export function kickoffMongoConnection() {}
