import { config } from '../_config'

// ⊂◉‿◉つ
export function pingHello() {
  return fetch(config.api.hello, {
    method: 'POST',
    headers: generateHeaders(),
    body: JSON.stringify({
      text: 'hi',
    })
  })
}

/* api utils */
function generateHeaders() {
  const token = localStorage.getItem('id_token')
  const headers = {
    'Content-Type': 'application/json'
  }
  if (token) {
    return {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }
  return headers
}
