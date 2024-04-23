import { pool } from '@/app/api/db_connection'
import { Account, NewAccount } from './schema'

export function accountInsert(user_uuid: string, account: NewAccount) {
	return pool.query(
		`
        INSERT INTO "${user_uuid}".accounts
            (name, description, book_uuid) 
            VALUES ($1, $2, $3)
            RETURNING *
    	`,
		[account.name, account.description, account.book_uuid]
	)
}

export function accountGetOne(user_uuid: string, account_uuid: string) {
	return pool.query<Account>(
		`
        SELECT * FROM "${user_uuid}".accounts
            WHERE uuid = $1
    	`,
		[account_uuid]
	)
}
export function accountGetAll(user_uuid: string) {
	return pool.query<Account>(
		`
        SELECT * FROM "${user_uuid}".accounts
    	`
	)
}
export function accountUpdateOne(user_uuid: string, account: Account) {
	return pool.query<Account>(
		`
        UPDATE "${user_uuid}".accounts
            SET name = $1,
                description = $2
            WHERE uuid = $3
    	`,
		[account.name, account.description, account.uuid]
	)
}
export function accountDeleteOne(user_uuid: string, account_uuid: string) {
	return pool.query<Account>(
		`
        DELETE FROM "${user_uuid}".accounts
            WHERE uuid = $1
    	`,
		[account_uuid]
	)
}
