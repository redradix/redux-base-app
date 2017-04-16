import fetchMock from 'fetch-mock'
import realFetch from 'isomorphic-fetch'

let users = [{
  id: '0',
  name: 'miguel',
  surname: 'martin',
  email: 'miguel@redradix.com',
  role: 'admin'
}, {
  id: '1',
  name: 'aaron',
  surname: 'contreras',
  email: 'aaron@redradix.com',
  role: 'user'
}, {
  id: '2',
  name: 'julian',
  surname: 'toledo',
  email: 'julian@redradix.com',
  role: 'user'
}, {
  id: '3',
  name: 'carlos',
  surname: 'de la orden',
  email: 'carlos@redradix.com',
  role: 'user'
}, {
  id: '4',
  name: 'victor',
  surname: '',
  email: 'victor@redradix.com',
  role: 'user'
}, {
  id: '5',
  name: 'luis',
  surname: 'gil',
  email: 'luis@redradix.com',
  role: 'user'
}, {
  id: '6',
  name: 'diana',
  surname: 'gutiérrez',
  email: 'diana@redradix.com',
  role: 'user'
}]

const size = 3

/* eslint indent: 0 */
// NOTE: This was commented to deploy the application with mock data.
// TODO: Remove after api endpoints are working properly
// if (process.env.NODE_ENV === 'development') {
  fetchMock.get(new RegExp('/api/data/initial'), {data: {}})
  fetchMock.get(new RegExp('/api/session'),  {type: 'session', data: {user: {name: 'miguel', surname: 'martin', email: 'a@a.com', role: 'admin'}}})
  fetchMock.get(new RegExp('/api/users/\\d+'), function() {
    return {
      type: 'user',
      data: users[0]
    }
  })
  fetchMock.put(new RegExp('/api/users/\\d+'), function() {
    return {
      type: 'user',
      data: users[0]
    }
  })
  fetchMock.get(new RegExp('/api/users'), function(url) {
    const [, search] = url.split('?')
    let page = 0
    if (search) page = parseInt(search.split('=')[1], 10)
    const start = page * size
    const end = start + size
    return {
      type: 'list',
      data: {
        users: users.slice(start, end),
        pagination: {
          size,
          total: users.length
        }
      }
    }
  })
  fetchMock.delete(new RegExp('/api/users/\\d+'), function(url) {
    const id = url.split('/').pop()
    users = users.filter(u => u.id !== id)
    return {}
  })
  fetchMock.delete(new RegExp('/api/session'), {type: 'session', data: []})
  fetchMock.post(new RegExp('/api/session'), {type: 'session', data: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlndWVsIiwic3VybmFtZSI6Im1hcnRpbiIsImVtYWlsIjoiYUBhLmNvbSIsImlhdCI6MTQ4NzcwMTEyOCwiZXhwIjoxNDg3NzI5OTI4fQ.SUUccKC13c_gdlxUf5FN1o4xeIxF9lyWSJNn3N0PNiw'}})
  .catch((unmatchedUrl, options) => {
    return realFetch(unmatchedUrl, options)
  })
// }
