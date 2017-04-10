import { schema } from 'normalizr'

export const DOMAIN = 'users'
export const ENDPOINT = 'api/user'

export const userSchema = new schema.Entity(DOMAIN)
