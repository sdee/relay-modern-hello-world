# Relay Modern Hello World

This is a simple ejected `create-react-app` project with the minimal parts added to load a query with the [Relay Modern](https://facebook.github.io/relay/docs/relay-modern.html) release candidate. It calls a remote server that we use for a lot of example apps, the [GitHunt](http://www.githunt.com/) app, which is like a clone of Product Hunt for GitHub repositories. You can get access to [GraphiQL here](http://api.githunt.com/graphiql), and the [code for the server](https://github.com/apollographql/githunt-api) is available as well.

This example was prepared as part of an [in-depth blog post about Relay Modern](https://dev-blog.apollodata.com/exploring-relay-modern-276f5965f827).

## Running the app

```
yarn
yarn start
```

If you edit the query code, run the Relay Compiler:

```
yarn run relay
# or, to watch files and rerun
yarn run relay -- --watch
```


## Code explanation

Here are the parts to look at:

### [schema.graphql](schema.graphql)

This is the schema. We need this file to be passed into the `relay-compiler`.

### [scripts/getSchema.js](scripts/getSchema.js)

This is a simple script I wrote up to introspect a remote server and save the schema in `.graphql` format.

### [package.json](package.json)

Here we have added some scripts for the build process:

```js
"relay": "relay-compiler --src ./src --schema schema.graphql",
"get-schema": "node scripts/getSchema.js"
```

### [.babelrc](.babelrc)

We needed to install the `babel-relay-plugin` and add it to `.babelrc`:

```js
{
  "presets": [
    "react-app"
  ],
  "plugins": [
    "relay"
  ]
}

```

### [src/__generated__/AppFeedQuery.graphql.js](src/__generated__/AppFeedQuery.graphql.js)

This is the code that gets generated when you `yarn run relay` to run the Relay compiler. It's based on the query in `App.js`.

### [src/createRelayEnvironment.js](src/createRelayEnvironment.js)

This file creates a Relay Environment and a Network instance that configures Relay with a function to fetch queries from the remote server.

### [src/App.js](src/App.js)

This is the entirety of the application code, with the most important part being the `QueryRenderer` which calls Relay to inject data into the `Feed` component.
