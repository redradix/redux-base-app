import { parseUrl } from 'mocks/utils'

export const endpoint = '/api/users'

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

let size = 3

export async function getUser(request) {
  const { url } = parseUrl(request)
  const parts = url.split('/')
  const id = parts.pop() || parts.pop() // trailing /
  return {
    type: 'user',
    data: users.find(u => u.id === id)
  }
}

export async function getUsers(request) {
  const { queryString } = parseUrl(request)
  const start = parseInt(queryString.page, 10) * size
  return {
    type: 'list',
    data: {
      users: users.slice(start, start + size),
      pagination: {
        size,
        total: users.length
      }
    }
  }
}

export async function createUser(request) {
  const body = await request.json()
  const user = Object.assign({ id: `${users.length}` }, body)
  users.push(user)
  return { type: 'user', data: user }
}

export async function updateUser(request) {
  const body = await request.json()
  const { url } = parseUrl(request)
  const parts = url.split('/')
  const id = parts.pop() || parts.pop() // trailing /

  const index = users.findIndex(u => u.id === id)
  users[index] = Object.assign(users[index], body) // NOTE: Don't mind updating id
  return { type: 'user', data: users[0] }
}

export async function deleteUser(request) {
  const { url } = parseUrl(request)
  const parts = url.split('/')
  const id = parts.pop() || parts.pop() // trailing /

  users = users.filter(u => u.id !== id)

  return 204
}
