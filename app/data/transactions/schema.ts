import Joi from 'joi'

// data restrictions
export const transactionRestrictions = {
	nameMaxChar: 127,
	amountScale: 12,
	amountPrecision: 2,
	amountMax: 9999999999.99,
	amountMin: -99999999999.99,
	notesMaxLength: 3000,
}

export interface NewTransaction {
	name: string
	amount: number
	notes: string | null
	category_uuid: string | null
	account_uuid: string | null
	date: Date
	book_uuid: string
}

export const newTransactionSchema = Joi.object({
	name: Joi.string().max(transactionRestrictions.nameMaxChar).required(),
	amount: Joi.number()
		.precision(transactionRestrictions.amountPrecision)
		.max(transactionRestrictions.amountMax)
		.min(transactionRestrictions.amountMin),
	notes: Joi.string().max(transactionRestrictions.notesMaxLength),
	category_uuid: Joi.string(),
	account_uuid: Joi.string(),
	date: Joi.date().required(),
	book_uuid: Joi.string().required(),
})

export interface Transaction extends NewTransaction {
	uuid: string
	sort_pos: number
	timestamp: Date
}

export const transactionSchema = newTransactionSchema.append({
	uuid: Joi.string().required(),
	sort_pos: Joi.number().required(),
	timestamp: Joi.date().required(),
})
