import { pool } from '@/app/api/db_connection'
import { accountRestrictions } from './schema'

export function accountCreateTable(user_uuid: string) {
	return pool.query(
		`
        CREATE TABLE IF NOT EXISTS "${user_uuid}".accounts
        (
            uuid uuid NOT NULL DEFAULT gen_random_uuid(),
            name character varying(${accountRestrictions.nameMaxChar}) NOT NULL,
            description text,
            sort_pos numeric NOT NULL DEFAULT 0,
            "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            book_id uuid REFERENCES "${user_uuid}".books(uuid) ON DELETE CASCADE,
            CONSTRAINT accounts_pkey PRIMARY KEY (uuid)
        )
        `
	)
}
