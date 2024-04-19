import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from './JWT_SECRET_KEY'

/**
 * Creates a token out of a payload of information, 1 hour expiration
 * @param payload The `object` to be tokenified
 * @returns The token as a `string`
 */
function encryptToken(payload: { uuid: string }) {
	const options: jwt.SignOptions = {
		expiresIn: '1h',
	}

	const token = jwt.sign(payload, JWT_SECRET_KEY, options)

	return token
}
export default encryptToken
