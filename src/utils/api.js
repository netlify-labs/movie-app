import config from '../_config'
import * as algoliasearch from 'algoliasearch'

const client = algoliasearch(config.algolia.appId, config.algolia.apiKey)
const index = client.initIndex(config.algolia.index)

export function movieDetails(id) {
  return index.getObject(id)
}

// Unprotected Route
export function getMovies() {
  return fetch(config.api.getMovies, {
    method: 'POST',
  }).then(data => data.json())
}

// Protected Route
export function getShowtimes() {
  return fetch(config.api.getShowtimes, {
    method: 'POST',
    headers: generateHeaders()
  }).then(data => data.json())
}

/* api utils */
function generateHeaders() {
  const token = localStorage.getItem('access_token')
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
