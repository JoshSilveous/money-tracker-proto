import { pool } from '@/app/api/db_connection'
import { bookRestrictions } from './schema'

export function bookCreateTable(user_uuid: string) {
	return pool.query(
		`
        CREATE TABLE IF NOT EXISTS "${user_uuid}".books
        (
            uuid uuid NOT NULL DEFAULT gen_random_uuid(),
            name character varying(${bookRestrictions.nameMaxChar}) NOT NULL,
            description text,
            sort_pos numeric NOT NULL DEFAULT 0,
            "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT books_pkey PRIMARY KEY (uuid)
        )
        `
	)
}
