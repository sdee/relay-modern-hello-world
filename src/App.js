import React, { Component } from 'react';

import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from './createRelayEnvironment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Tiny GitHunt</h2>
        <QueryRenderer
          environment={environment}

          query={graphql`
            query AppFeedQuery {
              feed (type: NEW, limit: 5) {
                repository {
                  owner { login }
                  name
                  stargazers_count
                }

                postedBy { login }
              }
            }
          `}

          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>;
            } else if (props) {
              console.log(props.feed);
              return <Feed feed={props.feed} />;
            }
            return <div>Loading</div>;
          }}
        />
        <h3>More info</h3>
        <ul>
          <li><a href="http://www.githunt.com/">Full GitHunt App</a></li>
          <li><a href="https://github.com/stubailo/relay-modern-hello-world">Improve this example on GitHub</a></li>
        </ul>
      </div>
    );
  }
}

const Feed = ({ feed }) => (
  <ol>
    {feed.map(entry => (
      <li key={entry.repository.owner.login + '/' + entry.repository.name}>
        {entry.repository.owner.login}/{entry.repository.name}: {entry.repository.stargazers_count} Stars
      </li>
    ))}
  </ol>
)

export default App;
