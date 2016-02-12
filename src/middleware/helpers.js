export function applyHeaders(request, token) {
  if (token) {
    request.headers = request.headers || {}
    request.headers.Authorization = 'Bearer ' + token
  }
  return {
    ...request,
    headers: {
      ...request.headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}
