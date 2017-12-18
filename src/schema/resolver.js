const { GraphQLDateTime } = require('graphql-iso-date');
const GraphQLJSON = require('graphql-type-json');

const executions = [
  {
    id: 1,
    name: "Run 1",
    status: "PASS",
    createdAt: "2007-12-03T10:15:30Z",
    updatedAt: "2007-12-03T10:15:30Z",
    type: "Automated",
    testApi: "TestNG",
    configuration: {
      "browser": "chrome",
      "version": "2.1.0",
    }
  },
  {
    id: 2,
    name: "Run 2",
    status: "FAIL",
    createdAt: "2017-12-03T10:15:30Z",
    updatedAt: "2017-12-03T10:15:30Z",
    type: "Automated",
    testApi: "Cucumber",
    configuration: {
      "browser": "firefox",
      "version": "2.3.0",
    }
  }
];

module.exports = {
  Query: {
    allExecutions: async(root, data, {mongo: { Executions }}) => {
      return await Executions.find({}).toArray();
    },
  },

  Mutation: {
    createExecution: async(root, data, {mongo: { Executions }}) => {
      const response = await Executions.insert(data.execution);
      return Object.assign({id: response.insertedIds[0]}, data.execution);
    },
  },

  Execution: {
    id: root => root._id || root.id,
  },

  Json: GraphQLJSON,
  DateTime: GraphQLDateTime,
};
