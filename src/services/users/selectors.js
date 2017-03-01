import { getCommState } from 'modules/communication'
import { getEntityList } from 'modules/entities'
import { getUIElement } from 'modules/ui'
import { DOMAIN } from './'

export const isUserListReady = state => getCommState(state, DOMAIN, false)
export const getUserList = state => getEntityList(state, DOMAIN)
export const getUser = (state, email) => getUserList(state).find(({ user }) => user.email === email)

export const isUserCreated = state => getUIElement(state, 'myAccount', 'user', false)
