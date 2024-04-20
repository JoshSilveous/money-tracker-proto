import { dbPool } from '../../../db_connection'
import {
	Transaction,
	transactionInsert,
	transactionSchema,
} from '@/app/data/transaction/transaction'
import { verifyToken } from '@/app/util/token/token'

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
	const uuid = (await verifyToken(data.token)).uuid

	const { error: joiError } = transactionSchema.validate(data.payload)
	if (joiError) {
		return Response.json(joiError, { status: 401, statusText: 'Invalid Data' })
	}

	const payload = data.payload as Transaction
	const res = await transactionInsert(uuid, dbPool, payload)

	return Response.json({
		message: `Received!`,
		transaction: res.rows[0],
	})
}