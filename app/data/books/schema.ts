import Joi from 'joi'

// data restrictions
export const bookRestrictions = {
	nameMaxChar: 127,
	descriptionMaxLength: 3000,
}

export interface NewBook {
	name: string
	description: string | null
}

export const newBookSchema = Joi.object({
	name: Joi.string().max(bookRestrictions.nameMaxChar).required(),
	description: Joi.string().max(bookRestrictions.descriptionMaxLength),
})

export interface Book extends NewBook {
	uuid: string
	sort_pos: number
	timestamp: Date
}

export const bookSchema = newBookSchema.append({
	uuid: Joi.string().required(),
	sort_pos: Joi.number().required(),
	timestamp: Joi.date().required(),
})
