import { kickoffMongoConnection } from './meta/db_connection'

export function register() {
	kickoffMongoConnection()
}
