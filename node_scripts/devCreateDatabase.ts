import { pool } from '@/app/api/db_connection'
import { transactionRestrictions } from '@/app/data/transactions'
import { accountRestrictions } from '@/app/data/accounts'
import { bookRestrictions } from '@/app/data/books'
import { categoryRestrictions } from '@/app/data/categories'
import { userRestrictions } from '@/app/data/users'

export async function devCreateDatabase() {
	console.log('Creating tables in database...')

<<<<<<< HEAD
	console.log('    Creating "book_access_role" type...')
	await pool.query(
		`
        CREATE TYPE book_access_role AS ENUM ('owner', 'admin', 'viewer');
        `
	)
	console.log('        Success!')

=======
>>>>>>> 8b91b615b0b19464243c42fa6504b89f2aacf195
	console.log('    Creating "server.users" table...')
	await pool.query(
		`
        CREATE TABLE IF NOT EXISTS server.users
        (
            user_id uuid NOT NULL DEFAULT gen_random_uuid(),
            username character varying(${userRestrictions.passwordMaxChar}) NOT NULL,
            password character varying(72) NOT NULL,
            CONSTRAINT users_pkey PRIMARY KEY (user_id),
            CONSTRAINT users_username_key UNIQUE (username)
        )
        `
	)
	console.log('        Success!')

	console.log('    Creating "server.books" table...')
	await pool.query(
		`
        CREATE TABLE IF NOT EXISTS server.books
        (
            book_id uuid NOT NULL DEFAULT gen_random_uuid(),
            name character varying(${bookRestrictions.nameMaxChar}) NOT NULL,
            description text,
            sort_pos numeric NOT NULL DEFAULT 0,
            "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT books_pkey PRIMARY KEY (book_id)
        )
        `
	)
	console.log('        Success!')

	console.log('    Creating "server.book_access" table...')
	await pool.query(
		`
        CREATE TABLE IF NOT EXISTS server.book_access
        (
            book_access_id uuid NOT NULL DEFAULT gen_random_uuid(),
            user_id uuid NOT NULL REFERENCES server.users(user_id) ON DELETE CASCADE,
            book_id uuid NOT NULL REFERENCES server.books(book_id) ON DELETE CASCADE,
            role book_access_role NOT NULL, ${/* Flesh out roles later */ ''}
            CONSTRAINT book_access_pkey PRIMARY KEY (book_access_id)
        )
        `
	)
	console.log('        Success!')

	console.log('    Creating "server.accounts" table...')
	await pool.query(
		`
        CREATE TABLE IF NOT EXISTS server.accounts
        (
            account_id uuid NOT NULL DEFAULT gen_random_uuid(),
            name character varying(${accountRestrictions.nameMaxChar}) NOT NULL,
            description text,
            sort_pos numeric NOT NULL DEFAULT 0,
            "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            book_id uuid REFERENCES server.books(book_id) ON DELETE CASCADE,
            CONSTRAINT accounts_pkey PRIMARY KEY (account_id)
        )
        `
	)
	console.log('        Success!')

	console.log('    Creating "server.categories" table...')
	await pool.query(
		`
        CREATE TABLE IF NOT EXISTS server.categories
        (
            category_id uuid NOT NULL DEFAULT gen_random_uuid(),
            name character varying(${categoryRestrictions.nameMaxChar}) NOT NULL,
            description text,
            sort_pos numeric NOT NULL DEFAULT 0,
            "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            book_id uuid REFERENCES server.books(book_id) ON DELETE CASCADE,
            CONSTRAINT categories_pkey PRIMARY KEY (category_id)
        )
        `
	)
	console.log('        Success!')

	console.log('    Creating "server.transactions" table...')
	await pool.query(
		`
        CREATE TABLE IF NOT EXISTS server.transactions
        (
            transaction_id uuid NOT NULL DEFAULT gen_random_uuid(),
            name character varying(${transactionRestrictions.nameMaxChar}) NOT NULL,
            amount numeric(${transactionRestrictions.amountScale},${transactionRestrictions.amountPrecision}) NOT NULL,
            notes text,
            category_id uuid REFERENCES server.categories(category_id) ON DELETE SET NULL,
            account_id uuid REFERENCES server.accounts(account_id) ON DELETE SET NULL,
            date date NOT NULL,
            sort_pos numeric NOT NULL DEFAULT 0,
            "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            book_id uuid REFERENCES server.books(book_id) ON DELETE CASCADE,
            CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id)
        )
        `
	)
	console.log('        Success!')
}

devCreateDatabase().then(() => {
	console.log('')
	process.exit()
})
