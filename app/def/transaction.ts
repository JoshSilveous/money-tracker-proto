/**
 * Here's how the user's database will be structured:
 *
 *  User (UUID)
 *      - info
 *          - config (a single document with the user's settings in it)
 *      - transactions
 *          - multiple transactions
 *      - categories
 *          - multiple categories
 *      - accounts
 *          - multiple accounts
 *      - views
 *          - figure this out later
 */
import mongoose, { Document, Schema } from 'mongoose'

export interface ITransaction extends Document {
	name: string
	amount: number
	created_time: Date
}

const transactionSchema: Schema = new Schema({
	name: { type: String, required: true },
	amount: { type: Number, required: true },
	created_time: { type: Date, default: Date.now() },
})
console.log('Transaction defined!')
const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema)

export { Transaction }
