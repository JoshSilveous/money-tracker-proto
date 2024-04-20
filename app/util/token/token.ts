import * as jose from 'jose'
import { JWT_SECRET_KEY } from './JWT_SECRET_KEY'

const secret = new TextEncoder().encode(JWT_SECRET_KEY)

export async function createToken(uuid: string) {
	const jwt = await new jose.SignJWT({ uuid: uuid })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1h')
		.sign(secret)
	return jwt
}

export async function verifyToken(token: string) {
	const verifiedToken = await jose.jwtVerify(token, secret)
	return verifiedToken.payload as jose.JWTPayload & HasUUID
}
