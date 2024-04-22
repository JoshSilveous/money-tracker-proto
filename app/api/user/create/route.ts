import { User, userCreate, userSchema } from '@/app/data/users/user'
import { parseAndValidate } from '@/app/util/parseAndValidate'
import { createToken } from '@/app/util/token/token'
import Joi from 'joi'

export async function POST(req: Request) {
	const { error, data } = await parseAndValidate(
		req,
		Joi.object({
			payload: userSchema.required(),
		})
	)

	if (error) {
		return Response.json({ message: error }, { status: 401 })
	}
	const payload = data.payload as User

	try {
		const res = await userCreate(payload)
		const newUUID = res.rows[0].uuid
		const newToken = await createToken(newUUID)

		return Response.json({
			message: `Success`,
			newUUID: newUUID,
			newToken: newToken,
		})
	} catch (e) {
		if (
			(e as Error).message ===
			`duplicate key value violates unique constraint "users_username_key"`
		) {
			return Response.json({ message: 'Username already exists' }, { status: 409 })
		} else {
			return Response.json({ message: 'Unknown error' }, { status: 409 })
		}
	}
}
