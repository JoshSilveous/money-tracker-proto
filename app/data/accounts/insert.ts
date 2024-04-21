import { pool } from '@/app/api/db_connection'
import { NewAccount } from './schema'

export function accountInsert(user_uuid: string, account: NewAccount) {
	return pool.query(
		`
        INSERT INTO "${user_uuid}".accounts
            (name, description, book_id) 
            VALUES ($1, $2, $3)
            RETURNING *
    `,
		[account.name, account.description, account.book_id]
	)
}
