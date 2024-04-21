import { pool } from '@/app/api/db_connection'
import { NewBook } from './schema'

export function bookInsert(user_uuid: string, book: NewBook) {
	return pool.query(
		`
        INSERT INTO "${user_uuid}".books
            (name, description) 
            VALUES ($1, $2)
            RETURNING *
    `,
		[book.name, book.description]
	)
}
