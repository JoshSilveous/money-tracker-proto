import { Pool } from 'pg'

console.log('Connecting to PostgreSQL server...')
export const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: 'db-connect',
	port: 5432,
})

console.log('PostgreSQL connected')
