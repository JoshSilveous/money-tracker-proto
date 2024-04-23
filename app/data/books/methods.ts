import { pool } from '@/app/api/db_connection'
import { Book, NewBook } from './schema'

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

export function bookUpdateOne(user_uuid: string, book: Book) {
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

export function bookDeleteOne(user_uuid: string, book_uuid: Book) {
	return pool.query<Book>(
		`
        DELETE FROM "${user_uuid}".books
            WHERE uuid = $1
    	`,
		[book_uuid]
	)
}
