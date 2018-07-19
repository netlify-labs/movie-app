import config from '../_config'
import * as algoliasearch from 'algoliasearch';

const client = algoliasearch(config.algolia.appId, config.algolia.apiKey);
const index = client.initIndex(config.algolia.index);

export function movieDetails(id){
  return index.getObject(id);
}

// Implement API Call to Serverless Function to Get Showtimes
export function getShowtimes(){
  return 'To Be Implemented'
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