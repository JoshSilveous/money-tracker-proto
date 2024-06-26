import { pool } from '@/app/api/db_connection'
import { NewTransaction } from './schema'

export function transactionInsert(user_uuid: string, transaction: NewTransaction) {
	return pool.query(
		`
        INSERT INTO "${user_uuid}".transactions
            (name, amount, notes, category_uuid, account_uuid, date, book_uuid) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
    `,
		[
			transaction.name,
			transaction.amount,
			transaction.notes,
			transaction.category_uuid,
			transaction.account_uuid,
			transaction.date,
			transaction.book_uuid,
		]
	)
}
