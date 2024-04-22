import { pool } from '@/app/api/db_connection'
import { Book } from '.'

export function bookUpdateOne(user_uuid: string, book: Book) {
	console.log('input:', book)
	return pool.query<Book>(
		`
        UPDATE "${user_uuid}".books
        SET name = $1,
            description = $2
        WHERE uuid = $3
    	`,
		[book.name, book.description, book.uuid]
	)
}
