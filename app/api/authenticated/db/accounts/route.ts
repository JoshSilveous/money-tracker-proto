import { NewAccount, accountInsert, newAccountSchema } from '@/app/data/accounts'
import { createToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	const data = await req.json()
	const userUUID = req.headers.get('authenticated-uuid')!

	const { error: joiError } = newAccountSchema.validate(data.payload)
	if (joiError) {
		return Response.json(joiError, { status: 401, statusText: 'Invalid Data' })
	}

	const payload = data.payload as NewAccount
	const res = await accountInsert(userUUID, payload)
	const newToken = await createToken(userUUID)
	return Response.json({
		message: `Success`,
		account: res.rows[0],
		newToken: newToken,
	})
}
