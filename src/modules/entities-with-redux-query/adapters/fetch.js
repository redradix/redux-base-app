
/**
 * fetch network adapter for redux-query
 * @version 0.1.0
 * @author Aaron Contreras <aaron@redradix.com>
 */

async function buildResponse(response) {
  // REVIEW: Shall we throw an error when status < 200 || status >= 300 ?
  const resStatus = response.status
  const resText = await response.text()
  const resBody = JSON.parse(resText)
  const resHeaders = {}
  response.headers.forEach((v, h) => resHeaders[h] = v)

  return { resStatus, resBody, resText, resHeaders }
}

const fetchNetworkAdapter = (url, method, { body, headers, credentials } = {}) => {
  const options = { method, body, headers, credentials }
  const request = window.fetch.bind(window.fetch, url, options)

  const execute = (cb) =>
    request()
    .then(buildResponse, cb) // REVIEW: Should we move cb to the 2nd then?
    .then(({ resStatus, resBody, resText, resHeaders }) =>
      cb(void 0, resStatus, resBody, resText, resHeaders))

  // TODO: Add some hack to prevent the callback from being performed after abortion
  const abort = () => void 0

  return {
    abort,
    execute,
    instance: void 0 // There is no way to access the request instance
  }
}

export default fetchNetworkAdapter
