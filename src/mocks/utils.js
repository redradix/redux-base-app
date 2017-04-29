
export function parseUrl(request) {
  const url = request.url

  let [, queryString ] = url.split('?')
  if (queryString) {
    queryString = queryString.split('&').reduce((acc, param) => {
      const [ k, v ] = param.split('=')
      return Object.assign(acc, { [k]: v })
    }, {})
  }

  return { url, queryString }
}

export const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms))
