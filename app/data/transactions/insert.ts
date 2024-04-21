import { pool } from '@/app/api/db_connection'
import { NewTransaction } from './schema'

export function transactionInsert(user_uuid: string, transaction: NewTransaction) {
	return pool.query(
		`
        INSERT INTO "${user_uuid}".transactions
            (name, amount, notes, category_id, account_id, date, book_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
    `,
		[
			transaction.name,
			transaction.amount,
			transaction.notes,
			transaction.category_id,
			transaction.account_id,
			transaction.date,
			transaction.book_id,
		]
	)
}
