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
	category_id: string | null
	account_id: string | null
	date: Date
}

export const newTransactionSchema = Joi.object({
	name: Joi.string().max(transactionRestrictions.nameMaxChar).required(),
	amount: Joi.number()
		.precision(transactionRestrictions.amountPrecision)
		.max(transactionRestrictions.amountMax)
		.min(transactionRestrictions.amountMin),
	notes: Joi.string().max(transactionRestrictions.notesMaxLength),
	category_id: Joi.string(),
	account_id: Joi.string(),
	date: Joi.date().required(),
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
