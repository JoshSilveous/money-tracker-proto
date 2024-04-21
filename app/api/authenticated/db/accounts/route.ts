import { NewAccount, accountInsert, newAccountSchema } from '@/app/data/accounts'
import { createToken, verifyToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	const data = await req.json()
	const uuid = (await verifyToken(data.token)).uuid

	const { error: joiError } = newAccountSchema.validate(data.payload)
	if (joiError) {
		return Response.json(joiError, { status: 401, statusText: 'Invalid Data' })
	}

	const payload = data.payload as NewAccount
	const res = await accountInsert(uuid, payload)
	const newToken = await createToken(uuid)
	return Response.json({
		message: `Success`,
		account: res.rows[0],
		newToken: newToken,
	})
}
