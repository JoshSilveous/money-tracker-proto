import { createToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	/* 
    assume incoming data is 
    {
        username: 'joshuasi101',
        password: 'password'
    }
    */
	const data = await req.json()

	// logic that checks if credentials are correct in a database
	if (data.username === 'joshuasi101' && data.password === 'password') {
		const uuid = '123'
		// if correct, create a token and send it
		const newToken = await createToken(uuid)
		return Response.json({ token: newToken })
	} else {
		return Response.json(null, { status: 401, statusText: 'Invalid Credentials' })
	}
}
