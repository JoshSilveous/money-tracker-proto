import { pool } from '@/app/api/db_connection'
import { Book } from '.'

export function bookGetOne(user_uuid: string, book_uuid: string) {
	return pool.query<Book>(
		`
        SELECT * FROM "${user_uuid}".books
            WHERE uuid = $1
    	`,
		[book_uuid]
	)
}
export function bookGetAll(user_uuid: string) {
	return pool.query<Book>(
		`
        SELECT * FROM "${user_uuid}".books
        `
	)
}
