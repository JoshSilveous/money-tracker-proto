import Joi from 'joi'

// data restrictions
export const accountRestrictions = {
	nameMaxChar: 127,
	descriptionMaxLength: 3000,
}

export interface NewAccount {
	name: string
	description: string | null
	book_id: string
}

export const newAccountSchema = Joi.object({
	name: Joi.string().max(accountRestrictions.nameMaxChar).required(),
	description: Joi.string().max(accountRestrictions.descriptionMaxLength),
	book_id: Joi.string().required(),
})

export interface Account extends NewAccount {
	uuid: string
	sort_pos: number
	timestamp: Date
}

export const accountSchema = newAccountSchema.append({
	uuid: Joi.string().required(),
	sort_pos: Joi.number().required(),
	timestamp: Joi.date().required(),
})
