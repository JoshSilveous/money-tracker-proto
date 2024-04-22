import Joi from 'joi'

export const userRestrictions = {
	usernameMaxChar: 24,
	usernameMinChar: 6,
	passwordMaxChar: 24, // the hashed password stored will always be 60 char long
	passwordMinChar: 6,
}

export interface NewUser {
	username: string
	password: string
}

export const newUserSchema = Joi.object({
	username: Joi.string()
		.max(userRestrictions.usernameMaxChar)
		.min(userRestrictions.usernameMinChar)
		.required(),
	password: Joi.string()
		.max(userRestrictions.passwordMaxChar)
		.min(userRestrictions.passwordMinChar)
		.required(),
})

export interface User extends NewUser {
	uuid: string
}

// no need for a userSchema
