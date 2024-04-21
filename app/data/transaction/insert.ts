import { pool } from '@/app/api/db_connection'
import { Transaction } from './schema'

export function transactionInsert(user_uuid: string, transaction: Transaction) {
	return pool.query(
		`
        INSERT INTO "${user_uuid}".transactions
            (name, amount) 
            VALUES ($1, $2)
            RETURNING *
    `,
		[transaction.name, transaction.amount]
	)
}
