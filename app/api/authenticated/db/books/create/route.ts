import { NewBook, bookInsert, newBookSchema } from '@/app/data/books'
import { parseAndValidate } from '@/app/util/parseAndValidate'
import { createToken } from '@/app/util/token/token'
import Joi from 'joi'

export async function POST(req: Request) {
	const { error, data } = await parseAndValidate(
		req,
		Joi.object({
			payload: newBookSchema.required(),
		})
	)

	if (error) {
		return Response.json({ message: error }, { status: 401 })
	}

	const payload = data.payload as NewBook

	const userUUID = req.headers.get('authenticated-uuid')!
	const newToken = await createToken(userUUID)

	try {
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
