import { pool } from '@/app/api/db_connection'
import * as bcrypt from 'bcrypt'
import Joi from 'joi'

/*      Create table
CREATE TABLE IF NOT EXISTS server.users
(
    uuid uuid NOT NULL DEFAULT gen_random_uuid(),
    username character varying(24) NOT NULL,
    password character varying(72) NOT NULL,
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

export const userSchema = Joi.object({
	username: Joi.string().max(usernameMaxChar).min(usernameMinChar).required(),
	password: Joi.string().max(passwordMaxChar).min(passwordMinChar).required(),
})

export async function userInsert(user: User) {
	const hashedPassword = await bcrypt.hash(user.password, 10)

	const res = await pool.query(
		`
	    INSERT INTO "server".users
	        (username, password)
	        VALUES ($1, $2)
	        RETURNING *
	    `,
		[user.username, hashedPassword]
	)

	// implement logic to create user's DB schema and some tables

	return res
}

export async function userSignin(username: string, password: string) {
	const res = await pool.query(
		`
        SELECT * FROM "server".users
            WHERE username = $1
        `,
		[username]
	)

	if (res.rowCount === 0) {
		throw new Error('Username not found')
	}
	const retrievedUser = res.rows[0]

	const passwordMatches = await bcrypt.compare(password, retrievedUser.password)
	if (!passwordMatches) {
		throw new Error('Password doesnt match')
	}

	return {
		uuid: retrievedUser.uuid,
		username: retrievedUser.username,
	}
}
