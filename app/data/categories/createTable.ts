import { pool } from '@/app/api/db_connection'
import { categoryRestrictions } from './schema'

export function categoryCreateTable(user_uuid: string) {
	return pool.query(
		`
        CREATE TABLE IF NOT EXISTS "${user_uuid}".categories
        (
            uuid uuid NOT NULL DEFAULT gen_random_uuid(),
            name character varying(${categoryRestrictions.nameMaxChar}) NOT NULL,
            description text,
            sort_pos numeric NOT NULL DEFAULT 0,
            "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            book_id uuid REFERENCES "${user_uuid}".books(uuid) ON DELETE CASCADE,
            CONSTRAINT categories_pkey PRIMARY KEY (uuid)
        )
        `
	)
}
