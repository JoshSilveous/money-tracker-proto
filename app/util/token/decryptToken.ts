import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from './JWT_SECRET_KEY'

/**
 * Decrypts a token encrypted with `encryptToken()`
 * @param token The token, `string` format
 * @returns The original `Payload` object
 */
function decryptToken(token: string) {
	try {
		const decodedToken = jwt.verify(token, JWT_SECRET_KEY)
		return decodedToken as jwt.JwtPayload
	} catch (error) {
		throw new Error((error as Error).message)
	}
}
export default decryptToken
