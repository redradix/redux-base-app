export function applyHeaders(request, headers) {
  return {
    ...request,
    headers: { 
      ...request.headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers }
    };
}

export function applyToken(request, token) {
  return applyHeaders(request, { 'Authorization': 'Bearer ' + token });
}
