import { NewBook, bookInsert, newBookSchema } from '@/app/data/books'
import { createToken } from '@/app/util/token/token'

export async function GET(req: Request) {
	const data = await req.json()
	const userUUID = req.headers.get('authenticated-uuid')!

	const { error: joiError } = newBookSchema.validate(data.payload)
	if (joiError) {
		return Response.json(joiError, { status: 401, statusText: 'Invalid Data' })
	}
	const newToken = await createToken(userUUID)

	try {
		const payload = data.payload as NewBook
		const res = await bookInsert(userUUID, payload)
		return Response.json({
			message: `Success`,
			book: res.rows[0],
			newToken: newToken,
		})
	} catch (e) {
		return Response.json({ message: 'Internal Server Error' }, { status: 500 })
	}
}
