const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

import { mockServer } from 'graphql-tools';
import schema from '../schema.graphql';

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
// function fetchQuery(
//   operation,
//   variables,
//   cacheConfig,
//   uploadables,
// ) {
//   return fetch('http://api.githunt.com/graphql', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }, // Add authentication and other headers here
//     body: JSON.stringify({
//       query: operation.text, // GraphQL text from input
//       variables,
//     }),
//   }).then(response => {
//     return response.json();
//   });
// }

function fetchQuery() {
	mockServer(schema, {
		Int: () => 6,
		Float: () => 22.1,
		String: () => 'Hello',
	});

	const appQuery = `
		query AppFeedQuery {
			feed (type: NEW, limit: 5) {
				...Feed
			}
		}
	`;

	return mockServer.query(appQuery);
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network,
  store,
});
