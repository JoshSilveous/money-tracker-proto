import { NewTransaction, newTransactionSchema, transactionInsert } from '@/app/data/transactions'
import { createToken } from '@/app/util/token/token'
import { parseAndValidate } from '@/app/util/parseAndValidate'
import Joi from 'joi'

export async function POST(req: Request) {
	const { error, data } = await parseAndValidate(
		req,
		Joi.object({
			payload: newTransactionSchema.required(),
		})
	)

	if (error) {
		return Response.json({ message: error }, { status: 401 })
	}
	const payload = data.payload as NewTransaction
	const userUUID = req.headers.get('authenticated-uuid')!
	const newToken = await createToken(userUUID)

	try {
		const res = await transactionInsert(userUUID, payload)
		return Response.json({
			message: `Success`,
			transaction: res.rows[0],
			newToken: newToken,
		})
	} catch (e) {
		return Response.json({ message: 'Internal Server Error' }, { status: 500 })
	}
}
