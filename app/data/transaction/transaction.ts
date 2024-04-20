import Joi from 'joi'
import { Pool } from 'pg'

export interface Transaction {
	name: string
	amount: number
}
export type TransactionWithID = Transaction & HasUUID

// data restrictions
const nameMaxChar = 127
const amountScale = 12
const amountPrecision = 2
const amountMax = 9999999999.99
const amountMin = -99999999999.99

export const transactionSchema = Joi.object({
	name: Joi.string().max(nameMaxChar).required(),
	amount: Joi.number().precision(amountPrecision).max(amountMax).min(amountMin),
})

export function transactionCreate(user_uuid: string, pool: Pool) {
	return pool.query(
		`
        CREATE TABLE IF NOT EXISTS "${user_uuid}".transactions
        (
            uuid uuid NOT NULL DEFAULT gen_random_uuid(),
            name character varying(${nameMaxChar}) NOT NULL,
            amount numeric(${amountScale},${amountPrecision}) NOT NULL,
            CONSTRAINT transactions_pkey PRIMARY KEY (uuid)
        )
        `
	)
}

export function transactionInsert(user_uuid: string, pool: Pool, payload: Transaction) {
	return pool.query(
		`
        INSERT INTO "${user_uuid}".transactions
            (name, amount) 
            VALUES ($1, $2)
            RETURNING *
    `,
		Object.values(payload)
	)
}
