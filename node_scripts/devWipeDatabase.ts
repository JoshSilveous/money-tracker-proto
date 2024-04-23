import { pool } from '../app/api/db_connection'

async function devWipeDatabase() {
	console.log('Wiping tables from database...')

	console.log('    Dropping "server.transactions" table...')
	await pool.query('DROP TABLE server.transactions')
	console.log('        Success!')

	console.log('    Dropping "server.categories" table...')
	await pool.query('DROP TABLE server.categories')
	console.log('        Success!')

	console.log('    Dropping "server.accounts" table...')
	await pool.query('DROP TABLE server.accounts')
	console.log('        Success!')

	console.log('    Dropping "server.book_access" table...')
	await pool.query('DROP TABLE server.book_access')
	console.log('        Success!')

	console.log('    Dropping "server.books" table...')
	await pool.query('DROP TABLE server.books')
	console.log('        Success!')

	console.log('    Dropping "server.users" table...')
	await pool.query('DROP TABLE server.users')
	console.log('        Success!')

	return
}

devWipeDatabase().then(() => {
	console.log('')
	process.exit()
})
