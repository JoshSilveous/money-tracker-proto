import { pool } from './app/api/db_connection'

async function resetDevData() {
	console.log('')
	console.log('clearing "server".users table...')

	await pool.query('DELETE FROM "server".users')

	console.log('    success')
	console.log('')

	console.log('wiping non-default schemas from database...')

	const getSchemaListRes = await pool.query(`
        SELECT schema_name
        FROM information_schema.schemata;
    `)

	const allSchemas = getSchemaListRes.rows.map((result) => result.schema_name)
	const excludedSchemas = new Set([
		'public',
		'server',
		'information_schema',
		'pg_catalog',
		'pg_toast',
	])

	const filteredSchemas = allSchemas.filter((item) => !excludedSchemas.has(item))
	for (const schema_name of filteredSchemas) {
		await pool.query(`
				DROP SCHEMA "${schema_name}" CASCADE
			`)
		console.log('        dropped schema', schema_name)
	}
	console.log('    success')

	return
}
resetDevData().then(() => {
	console.log('')
	process.exit()
})
