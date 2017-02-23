import fetchMock from 'fetch-mock'
import realFetch from 'isomorphic-fetch'

/* eslint indent: 0 */
// NOTE: This was commented to deploy the application with mock data.
// TODO: Remove after api endpoints are working properly
// if (process.env.NODE_ENV === 'development') {
  fetchMock.get(`${process.env.API_URL}api/data/initial`, {data: {}})
  fetchMock.get(`${process.env.API_URL}api/session`,  {type: 'session', data: {user: {name: 'miguel', surname: 'martin', email: 'a@a.com', role: 'user'}}})
  // fetchMock.delete(`${process.env.API_URL}api/session`, {type: 'session', data: []})
  fetchMock.post(`${process.env.API_URL}api/session`, {type: 'session', data: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlndWVsIiwic3VybmFtZSI6Im1hcnRpbiIsImVtYWlsIjoiYUBhLmNvbSIsImlhdCI6MTQ4NzcwMTEyOCwiZXhwIjoxNDg3NzI5OTI4fQ.SUUccKC13c_gdlxUf5FN1o4xeIxF9lyWSJNn3N0PNiw'}})
  .catch((unmatchedUrl, options) => {
    return realFetch(unmatchedUrl, options)
  })
// }
