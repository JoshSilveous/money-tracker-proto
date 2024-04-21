import { userSignin } from '@/app/data/user/user'
import { createToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	const data = await req.json()

	try {
		const userInfo = await userSignin(data.username, data.password)
		const newToken = await createToken(userInfo.uuid)
		return Response.json({ message: 'Success', username: userInfo.username, token: newToken })
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
