import mongoose from 'mongoose'

const MONGO_IP = 'localhost'
const MONGO_USERNAME = 'db-connect'
const MONGO_PASSWORD = 'db-connect'
const MONGO_CREDENTIAL_DB = 'admin'

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}?authSource=${MONGO_CREDENTIAL_DB}`
/**
 * test
 */
export default function registerMongoConnection() {
	console.log('Connecting to MongoDB...')
	mongoose
		.connect(uri)
		.then(() => console.log('MongoDB connected'))
		.catch((err) => console.log('MongoDB connection error:', err))
}
