import { pool } from '@/app/api/db_connection'
import * as bcrypt from 'bcrypt'
import Joi from 'joi'

/*      Create table
CREATE TABLE IF NOT EXISTS server.users
(
    uuid uuid NOT NULL DEFAULT gen_random_uuid(),
    username character varying(24) NOT NULL,
    password character varying(72) NOT NULL,
    name character varying(64) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (uuid),
    CONSTRAINT users_username_key UNIQUE (username)
)

*/

export interface User {
	username: string
	password: string
	name: string
}

const usernameMaxChar = 24
const usernameMinChar = 6
const passwordMaxChar = 24 // the hashed password stored will always be 60 char long
const passwordMinChar = 6
const nameMaxChar = 64
const nameMinChar = 1

export const userSchema = Joi.object({
	username: Joi.string().max(usernameMaxChar).min(usernameMinChar).required(),
	password: Joi.string().max(passwordMaxChar).min(passwordMinChar).required(),
	name: Joi.string().max(nameMaxChar).min(nameMinChar).required(),
})

export async function userInsert(user: User) {
	const hashedPassword = await bcrypt.hash(user.password, 10)

	return pool.query(
		`
	    INSERT INTO "server".users
	        (username, password, name)
	        VALUES ($1, $2, $3)
	        RETURNING *
	    `,
		[user.username, hashedPassword, user.name]
	)
}
