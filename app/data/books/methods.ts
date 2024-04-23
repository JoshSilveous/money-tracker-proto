import { pool } from '@/app/api/db_connection'
import { Book, NewBook } from './schema'

export async function bookInsert(user_uuid: string, book: NewBook) {
	// create the book
	const createBookRes = await pool.query(
		`
        INSERT INTO server.books
            (name, description) 
            VALUES ($1, $2)
            RETURNING *
        `,
		[book.name, book.description]
	)

	// link ownership to user
	const linkOwnershipRes = await pool.query(
		`
		INSERT INTO server.book_access
			(user_id, book_id, role)
			VALUES ($1, $2, 'owner')
		`,
		[user_uuid, createBookRes.rows[0].book_id]
	)
}
/* 
	Stopping here.
	I think I'll need to re-think how I approach this. Because I'll either need to:
	Check for access level for EVERY operation, since uuid isn't tied to transactions/categories/accounts (somebody could write up an api call with their own user_id and someone else's book_id, and it'd work)
	Or I can look into that row-level access stuff with Supabase. That might be the answer here.

*/

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
