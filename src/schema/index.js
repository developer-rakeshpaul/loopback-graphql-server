'use strict';

const { GraphQLSchema } = require('graphql');
const getQuery = require('./query');
const getMutation = require('./mutation');
const getTypes = require('../types');

function getSchema(models, options) {
  const types = getTypes(models);

  const items = {
    query: getQuery(models, options),
    mutation: getMutation(models, options),
  };

  return new GraphQLSchema(items);
}

function buildSchema(app, options) {
  let models = [];
  app.models().forEach(function(element) {
    if (element.shared) models.push(element);
  });

  if (models.length >= 1) {
    return getSchema(models, options);
  }
  return null;
}

module.exports = {
  getSchema,
  buildSchema,
};
