import { NewBook, bookInsert, newBookSchema } from '@/app/data/books'
import { createToken, verifyToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	const data = await req.json()
	const uuid = req.headers.get('authenticated-uuid')!

	const { error: joiError } = newBookSchema.validate(data.payload)
	if (joiError) {
		return Response.json(joiError, { status: 401, statusText: 'Invalid Data' })
	}
	const payload = data.payload as NewBook
	const res = await bookInsert(uuid, payload)
	const newToken = await createToken(uuid)
	return Response.json({
		message: `Success`,
		book: res.rows[0],
		newToken: newToken,
	})
}
