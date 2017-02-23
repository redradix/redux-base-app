import { get as getInitialData } from 'resources/initial-data'
import {fetchConfig} from 'modules/config'
import {commAttempt, commSuccess, commError } from 'modules/communication'
import { DOMAIN } from './'

export const fetchData = () => (dispatch) => {
  dispatch(commAttempt(DOMAIN))
  return Promise.all([
    getInitialData(dispatch),
    dispatch(fetchConfig(DOMAIN, '/config/dashboard.json')),
    dispatch(fetchConfig('info-sections', '/config/info-sections.json'))
  ])
  .then(() => {
    dispatch(commSuccess(DOMAIN))
  }, err => dispatch(commError(DOMAIN, err)))
}
