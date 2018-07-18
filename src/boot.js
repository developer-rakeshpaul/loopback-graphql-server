'use strict';

const { ApolloServer } = require('apollo-server-express');
const { getSchema } = require('./schema/index');
const { printSchema } = require('graphql/utilities');

const fs = require('fs');

module.exports = function(app, options) {
  let models = [];
  app.models().forEach(function(element) {
    if (element.shared) models.push(element);
  });

  if (models.length >= 1) {
    const schema = getSchema(models, options);

    fs.writeFileSync(
      require('path').join(__dirname, './schema.graphql'),
      printSchema(schema)
    );

    const path = options.path || '/graphql';

    const server = new ApolloServer({
      schema,
      context: ({ req }) => {
        return { req, app };
      },
    });
    server.applyMiddleware({ app, path });
  }
};
