import { pool } from '@/app/api/db_connection'
import { transactionRestrictions } from './schema'

export function transactionCreateTable(user_uuid: string) {
	return pool.query(
		`
        CREATE TABLE IF NOT EXISTS "${user_uuid}".transactions
        (
            uuid uuid NOT NULL DEFAULT gen_random_uuid(),
            name character varying(${transactionRestrictions.nameMaxChar}) NOT NULL,
            amount numeric(${transactionRestrictions.amountScale},${
			transactionRestrictions.amountPrecision
		}) NOT NULL,
            notes text,
            category_id uuid ${/*REFERENCES categories(uuid) ON DELETE SET NULL*/ ''},
            account_id uuid ${/*REFERENCES accounts(uuid) ON DELETE SET NULL*/ ''},
            date date NOT NULL,
            sort_pos numeric NOT NULL DEFAULT 0,
            "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT transactions_pkey PRIMARY KEY (uuid)
        )
        `
	)
}
