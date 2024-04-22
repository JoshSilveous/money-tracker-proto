import { User, userCreate, userSchema } from '@/app/data/users/user'
import { createToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	console.log('api hit')
	const data = await req.json()

	const { error: joiError } = userSchema.validate(data.payload)
	if (joiError) {
		return Response.json({ message: joiError.details[0].message }, { status: 401 })
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
