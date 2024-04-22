import { NewAccount, accountInsert, newAccountSchema } from '@/app/data/accounts'
import { parseAndValidate } from '@/app/util/parseAndValidate'
import { createToken } from '@/app/util/token/token'
import Joi from 'joi'

export async function POST(req: Request) {
	const { error, data } = await parseAndValidate(
		req,
		Joi.object({
			payload: newAccountSchema.required(),
		})
	)

	if (error) {
		return Response.json({ message: error }, { status: 401 })
	}

	const payload = data.payload as NewAccount
	const userUUID = req.headers.get('authenticated-uuid')!
	const newToken = await createToken(userUUID)

	try {
		const res = await accountInsert(userUUID, payload)
		return Response.json({
			message: `Success`,
			account: res.rows[0],
			newToken: newToken,
		})
	} catch (e) {
		return Response.json({ message: 'Internal Server Error' }, { status: 500 })
	}
}
