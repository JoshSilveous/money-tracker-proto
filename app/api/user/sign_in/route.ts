import { User, userSchema, userSignin } from '@/app/data/users/user'
import { createToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	const data = await req.json()

	const { error: joiError } = userSchema.validate(data.payload)
	if (joiError) {
		return Response.json(joiError, { status: 401, statusText: 'Invalid Data' })
	}

	const payload = data.payload as User

	try {
		const userInfo = await userSignin(payload)
		const newToken = await createToken(userInfo.uuid)
		return Response.json({ message: 'Success', token: newToken })
	} catch (e) {
		if ((e as Error).message === 'Username not found') {
			return Response.json({ message: 'Username not found' }, { status: 404 })
		} else if ((e as Error).message === 'Password doesnt match') {
			return Response.json({ message: 'Password doesnt match' }, { status: 401 })
		} else {
			return Response.json({ message: 'Unknown error' }, { status: 500 })
		}
	}
}
