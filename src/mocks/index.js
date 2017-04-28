import fetchMock from 'fetch-mock'
import realFetch from 'isomorphic-fetch'

import { endpoint as usersEndpoint, getUser, getUsers, createUser, updateUser, deleteUser } from 'mocks/endpoints/users'

if (process.env.NODE_ENV === 'development') {
  // users endpoints
  fetchMock.get(new RegExp(`${usersEndpoint}/\\d+/?$`), getUser)
  fetchMock.get(new RegExp(`${usersEndpoint}/?`), getUsers)
  fetchMock.post(new RegExp(`${usersEndpoint}/?$`), createUser)
  fetchMock.put(new RegExp(`${usersEndpoint}/\\d+/?$`), updateUser)
  fetchMock.delete(new RegExp(`${usersEndpoint}/\\d+/?$`), deleteUser)
  // misc
  fetchMock.get(new RegExp('/api/data/initial'), {data: {}})
  fetchMock.get(new RegExp('/api/session'),  {type: 'session', data: {user: {name: 'miguel', surname: 'martin', email: 'a@a.com', role: 'admin'}}})
  fetchMock.delete(new RegExp('/api/session'), {type: 'session', data: []})
  fetchMock.post(new RegExp('/api/session'), {type: 'session', data: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlndWVsIiwic3VybmFtZSI6Im1hcnRpbiIsImVtYWlsIjoiYUBhLmNvbSIsImlhdCI6MTQ4NzcwMTEyOCwiZXhwIjoxNDg3NzI5OTI4fQ.SUUccKC13c_gdlxUf5FN1o4xeIxF9lyWSJNn3N0PNiw'}})
  .catch((unmatchedUrl, options) => {
    return realFetch(unmatchedUrl, options)
  })
}
