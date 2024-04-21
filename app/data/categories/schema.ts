import Joi from 'joi'

// data restrictions
export const categoryRestrictions = {
	nameMaxChar: 127,
	descriptionMaxLength: 3000,
}

export interface NewCategory {
	name: string
	description: string | null
	book_uuid: string
}

export const newCategorySchema = Joi.object({
	name: Joi.string().max(categoryRestrictions.nameMaxChar).required(),
	description: Joi.string().max(categoryRestrictions.descriptionMaxLength),
	book_uuid: Joi.string().required(),
})

export interface Category extends NewCategory {
	uuid: string
	sort_pos: number
	timestamp: Date
}

export const categorySchema = newCategorySchema.append({
	uuid: Joi.string().required(),
	sort_pos: Joi.number().required(),
	timestamp: Joi.date().required(),
})
