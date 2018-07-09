import React from 'react'
import AppLayout from '../../fragments/AppLayout'

const Welcome = ({ location }) => (
  <AppLayout>
    <div style={{marginBottom: 60}}>
      <h1>App</h1>
      <p>Description about app</p>
      <h2>About the Frontend</h2>
      <ul>
        <li>
          React application based on <a href="https://github.com/facebookincubator/create-react-app">create react app</a>
        </li>
        <li>
          Routing via <a href="https://reacttraining.com/react-router/web/guides/philosophy" rel="nofollow">react router 4</a>
        </li>
        <li>
          User auth via <a href="https://auth0.com" rel="nofollow">Auth0</a>
        </li>
        <li>
          Hosted on <a href="https://www.netlify.com/" rel="nofollow">Netlify</a>
        </li>
        <li>
          Search via <a href="https://www.algolia.com/" rel="nofollow">algolia</a>
        </li>
        <li>
          State management via <a href="https://redux.js.org/" rel="nofollow">redux</a>
        </li>
      </ul>
      <h2>About the Backend</h2>
      <ul>
        <li>Node.js functions backend running in AWS Lambda Functions via Netlify Functions</li>
      </ul>
    </div>
  </AppLayout>
)

export default Welcome
