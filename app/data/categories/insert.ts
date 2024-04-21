import { pool } from '@/app/api/db_connection'
import { NewCategory } from './schema'

export function categoryInsert(user_uuid: string, category: NewCategory) {
	return pool.query(
		`
        INSERT INTO "${user_uuid}".categories
            (name, description, book_id) 
            VALUES ($1, $2, $3)
            RETURNING *
    `,
		[category.name, category.description, category.book_id]
	)
}
