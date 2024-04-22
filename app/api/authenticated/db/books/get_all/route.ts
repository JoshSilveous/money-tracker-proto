import { bookGetAll } from '@/app/data/books/get'
import { createToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	// incoming body should be empty

	const userUUID = req.headers.get('authenticated-uuid')!
	const newToken = await createToken(userUUID)

	try {
		const res = await bookGetAll(userUUID)
		return Response.json({
			message: `Success`,
			books: res.rows,
			newToken: newToken,
		})
	} catch (e) {
		console.log(e)
		return Response.json({ message: 'Internal Server Error' }, { status: 500 })
	}
}
