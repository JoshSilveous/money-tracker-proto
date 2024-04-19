import decryptToken from '@/app/util/token/decryptToken'

/**
 * Retrieves a transaction from the database
 */
export async function GET(req: Request) {
	const data = await req.json()
	return Response.json({ message: 'Hello from Next.js!' })
}
/**
 * Inserts a new transaction into the user's database
 */
export async function POST(req: Request) {
	const data = await req.json()
	console.log(data)
	try {
		const uuid = decryptToken(data.token).uuid
		return Response.json({ message: `Received! Your UUID is ${uuid}` })
	} catch (e) {
		return Response.json(null, { status: 401, statusText: 'Invalid Token' })
	}
}
