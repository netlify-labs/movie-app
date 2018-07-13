import config from '../_config'

// ⊂◉‿◉つ
export function pingHello() {
  return fetch(config.api.hello, {
    method: 'POST',
    headers: generateHeaders(),
    body: JSON.stringify({
      text: 'hi',
    })
  }).then(data => data.json())
}

export function getMovies() {
  return fetch(config.api.getMovies, {
    method: 'POST',
    headers: generateHeaders(),
    body: JSON.stringify({
      text: 'hi',
    })
  }).then(data => data.json())
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
