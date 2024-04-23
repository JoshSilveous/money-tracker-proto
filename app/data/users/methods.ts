import { pool } from '@/app/api/db_connection'
import * as bcrypt from 'bcrypt'
import { User } from '.'

export async function userCreate(user: User) {
	const hashedPassword = await bcrypt.hash(user.password, 10)

	const newUserEntryRes = await pool.query(
		`
	    INSERT INTO "server".users
	        (username, password)
	        VALUES ($1, $2)
	        RETURNING *
	    `,
		[user.username, hashedPassword]
	)

	// if user successfully created in users table
	if (newUserEntryRes.rowCount === 1) {
		return newUserEntryRes.rows[0].user_id
	} else {
		throw new Error('Error creating new user')
	}
}

export async function userSignin(user: User) {
	const res = await pool.query(
		`
        SELECT * FROM "server".users
            WHERE username = $1
        `,
		[user.username]
	)

	if (res.rowCount === 0) {
		throw new Error('Username not found')
	}
	const retrievedUser = res.rows[0]

	const passwordMatches = await bcrypt.compare(user.password, retrievedUser.password)
	if (!passwordMatches) {
		throw new Error('Password doesnt match')
	}

	return {
		uuid: retrievedUser.user_id,
	}
}
