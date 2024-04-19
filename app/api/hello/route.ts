export async function GET() {
	return Response.json({ message: 'Hello from Next.js!' })
}
export async function POST(req: Request) {
	const data = await req.json()
	console.log(data)
	return Response.json({ message: 'Received!' })
}
