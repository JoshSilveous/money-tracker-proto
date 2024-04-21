import { NewCategory, categoryInsert, newCategorySchema } from '@/app/data/categories'
import { createToken, verifyToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	const data = await req.json()
	const userUUID = req.headers.get('authenticated-uuid')!

	const { error: joiError } = newCategorySchema.validate(data.payload)
	if (joiError) {
		return Response.json(joiError, { status: 401, statusText: 'Invalid Data' })
	}

	const payload = data.payload as NewCategory
	const res = await categoryInsert(userUUID, payload)
	const newToken = await createToken(userUUID)
	return Response.json({
		message: `Success`,
		category: res.rows[0],
		newToken: newToken,
	})
}
