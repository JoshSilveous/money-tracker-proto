import { bookSchema, bookUpdateOne } from '@/app/data/books'
import { parseAndValidate } from '@/app/util/parseAndValidate'
import { createToken } from '@/app/util/token/token'
import Joi from 'joi'

export async function POST(req: Request) {
	const { error, data } = await parseAndValidate(
		req,
		Joi.object({
			payload: bookSchema.required(),
		})
	)
	if (error) {
		return Response.json({ message: error }, { status: 401 })
	}

	const userUUID = req.headers.get('authenticated-uuid')!
	const newToken = await createToken(userUUID)

	try {
		const modifiedBook = data.payload
		const res = await bookUpdateOne(userUUID, modifiedBook)
		if (res.rowCount === 0) {
			return Response.json({ message: 'Resource not found' }, { status: 404 })
		}
		return Response.json({
			message: `Success`,
			newToken: newToken,
		})
	} catch (e) {
		return Response.json({ message: 'Internal Server Error' }, { status: 500 })
	}
}
