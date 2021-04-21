const express = require('express');
// import Apollo Server
const { ApolloServer } = require('apollo-server-express');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// create a new apollo server and pass in the schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// integrate the apollo server with the express application as middleware
server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where the GWL API can be tested
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
