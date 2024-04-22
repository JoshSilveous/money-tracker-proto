import { pool } from '@/app/api/db_connection'
import { Book } from '.'

export function bookDeleteOne(user_uuid: string, book_uuid: Book) {
	return pool.query<Book>(
		`
        DELETE FROM "${user_uuid}".books
        WHERE uuid = $1
    	`,
		[book_uuid]
	)
}
