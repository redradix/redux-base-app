import { getCommState } from 'modules/communication'
import { DOMAIN } from './'

export const isAppReady = (state) => getCommState(state, DOMAIN, false)
