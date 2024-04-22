import Joi from 'joi'

interface Result {
	error: string | null
	data: any | null
}
/**
 * Parses an incoming HTTP Request's body, and validates it against provided schema
 * @param req The incoming HTTP Request
 * @param schema Joi schema to validate body against
 * @returns `{ error: string | null, data: any | null}`
 */

export async function parseAndValidate(
	req: Request,
	schema: Joi.ObjectSchema<any>
): Promise<Result> {
	let data = undefined
	try {
		data = await req.json()
	} catch (e) {
		return {
			error: 'Error parsing body',
			data: null,
		}
	}

	const { error } = schema.validate(data)
	if (error) {
		return {
			error: error.details[0].message,
			data: null,
		}
	} else {
		return {
			error: null,
			data: data,
		}
	}
}
