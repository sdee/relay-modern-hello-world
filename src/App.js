import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from './createRelayEnvironment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <QueryRenderer
          environment={environment}

          query={graphql`
            query AppFeedQuery {
              feed (type: TOP, limit: 5) {
                repository {
                  owner { login }
                  name
                }

                postedBy { login }
              }
            }
          `}

          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>;
            } else if (props) {
              return <div>{JSON.stringify(props.feed)}</div>;
            }
            return <div>Loading</div>;
          }}
        />
      </div>
    );
  }
}

export default App;
