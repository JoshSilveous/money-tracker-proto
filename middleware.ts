import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './app/util/token/token'
import { JWTInvalid } from 'jose/errors'
import Joi from 'joi'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
	console.log('middleware hit')

	// make sure request body is parsable
	let data = undefined
	try {
		data = await req.json()
	} catch (e) {
		return NextResponse.json({ error: 'Error parsing body' }, { status: 401 })
	}
	console.log('body parsed successfully')

	// make sure token is valid
	let uuid = undefined
	try {
		const token = await verifyToken(data.token)
		uuid = token.uuid
	} catch (e) {
		const errorCode = (e as JWTInvalid).name
		if (errorCode === 'JWTExpired') {
			return NextResponse.json({ error: 'Expired token' }, { status: 401 })
		} else {
			return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
		}
	}

	// make sure method type contains expected body
	switch (req.method) {
		case 'POST':
			const reqPOSTSchema = Joi.object({
				token: Joi.string().required(),
				payload: Joi.object().required(),
			})
			if (reqPOSTSchema.validate(data).error) {
				return NextResponse.json({ error: 'Invalid body format' }, { status: 401 })
			} else {
				NextResponse.next()
			}
		default:
			NextResponse.next()
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/api/authenticated/:path*',
}
