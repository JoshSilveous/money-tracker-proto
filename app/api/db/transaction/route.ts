import { Transaction } from '@/app/def/transaction'
import decryptToken from '@/app/util/token/decryptToken'
import { dbConnection } from '@/meta/db_connection'
import mongoose from 'mongoose'

/**
 * Retrieves a transaction from the database
 */
export async function GET(req: Request) {
	const data = await req.json()
	return Response.json({ message: 'Hello from Next.js!' })
}
/**
 * Inserts a new transaction into the user's database
 */
export async function POST(req: Request) {
	const data = await req.json()
	console.log(data)
	try {
		const uuid = decryptToken(data.token).uuid
		const db = dbConnection.useDb(uuid)
		// gotta figure out how to create a single "model" that i can use across any DB
		// currently looks like models are created per-db
		return Response.json({ message: `Received! Your UUID is ${uuid}` })
	} catch (e) {
		return Response.json(null, { status: 401, statusText: 'Invalid Token' })
	}
}
