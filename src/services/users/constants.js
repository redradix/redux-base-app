import { schema } from 'normalizr'

export const DOMAIN = 'users'
export const ENDPOINT = '/api/users/'

export const userSchema = new schema.Entity(DOMAIN)
