const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { createServer } = require('http');

const schema = require('./schema');
const connectMongo = require('./mongo-connector');

const start = async () => {
  const PORT = 3000;
  const mongo = await connectMongo();
  const app = express();

  const buildOptions = async( req, res ) => {
    return {
      context: {
        mongo
      },
      schema,
    };
  };

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`Test Dashboard GraphQL server running on port ${PORT}.`)
  });
};

start();
