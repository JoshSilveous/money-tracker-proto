import { pool } from '@/app/api/db_connection'
import { userRestrictions } from './schema'

export function categoryCreateTable() {
	return pool.query(
		`
        CREATE TABLE IF NOT EXISTS server.users
        (
            uuid uuid NOT NULL DEFAULT gen_random_uuid(),
            username character varying(${userRestrictions.passwordMaxChar}) NOT NULL,
            password character varying(72) NOT NULL,
            CONSTRAINT users_pkey PRIMARY KEY (uuid),
            CONSTRAINT users_username_key UNIQUE (username)
        )
        `
	)
}
