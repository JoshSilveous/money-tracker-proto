import { User, userSchema, userSignin } from '@/app/data/users/user'
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
		const userInfo = await userSignin(payload)
		const newToken = await createToken(userInfo.uuid)
		return Response.json({ message: 'Success', newToken: newToken })
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
