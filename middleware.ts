import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './app/util/token/token'
import { JWTInvalid } from 'jose/errors'
import Joi from 'joi'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
	// make sure token is provided
	const bearerHeader = req.headers.get('authorization')
	if (bearerHeader === null || bearerHeader === '') {
		return NextResponse.json({ message: 'Authorization header not provided' }, { status: 401 })
	}

	// make sure token is valid
	let uuid = undefined
	try {
		const token = await verifyToken(bearerHeader)
		uuid = token.uuid
	} catch (e) {
		const errorCode = (e as JWTInvalid).name
		if (errorCode === 'JWTExpired') {
			return NextResponse.json({ message: 'Expired token' }, { status: 401 })
		} else {
			return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
		}
	}

	// make sure request body is parsable
	let data = undefined
	try {
		data = await req.json()
	} catch (e) {
		return NextResponse.json({ message: 'Error parsing body' }, { status: 401 })
	}

	// append UUID to headers
	const reqHeaders = new Headers(req.headers)
	reqHeaders.set('authenticated-uuid', uuid)
	reqHeaders.delete('authorization')

	// make sure method type contains expected body
	switch (req.method) {
		case 'POST':
			const reqPOSTSchema = Joi.object({
				payload: Joi.object().required(),
			})
			if (reqPOSTSchema.validate(data).error) {
				return NextResponse.json({ message: 'Invalid body format' }, { status: 401 })
			} else {
				return NextResponse.next({
					headers: reqHeaders,
				})
			}
		default:
			return NextResponse.next({
				headers: reqHeaders,
			})
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/api/authenticated/:path*',
}
