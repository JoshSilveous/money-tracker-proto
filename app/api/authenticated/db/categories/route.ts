import { NewCategory, categoryInsert, newCategorySchema } from '@/app/data/categories'
import { createToken, verifyToken } from '@/app/util/token/token'

export async function POST(req: Request) {
	const data = await req.json()
	const uuid = req.headers.get('authenticated-uuid')!

	const { error: joiError } = newCategorySchema.validate(data.payload)
	if (joiError) {
		return Response.json(joiError, { status: 401, statusText: 'Invalid Data' })
	}

	const payload = data.payload as NewCategory
	const res = await categoryInsert(uuid, payload)
	const newToken = await createToken(uuid)
	return Response.json({
		message: `Success`,
		category: res.rows[0],
		newToken: newToken,
	})
}
