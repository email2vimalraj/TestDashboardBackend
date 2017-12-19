const { makeExecutableSchema } = require('graphql-tools');
const resolver = require('./resolver');

// Define your types here.
const typeDefs = `
  scalar Json
  scalar DateTime

  interface Node {
    id: ID!
    name: String!
    description: String
    status: STATUS!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Execution implements Node {
    id: ID!
    name: String!
    description: String
    status: STATUS!
    createdAt: DateTime!
    updatedAt: DateTime!
    type: String!
    testApi: String
    exception: String
    suites: [Suite!]
    configuration: Json
  }

  type Suite implements Node {
    id: ID!
    name: String!
    description: String
    status: STATUS!
    createdAt: DateTime!
    updatedAt: DateTime!
    exception: String
    execution: Execution!
    requirementId: String
    testcases: [Testcase!]
    configuration: Json
  }

  type Testcase implements Node {
    id: ID!
    name: String!
    description: String
    status: STATUS!
    createdAt: DateTime!
    updatedAt: DateTime!
    requirementId: String
    exception: String
    suite: Suite!
    configuration: Json
    teststeps: [Teststep!]
  }

  type Teststep implements Node {
    id: ID!
    name: String!
    description: String
    status: STATUS!
    createdAt: DateTime!
    updatedAt: DateTime!
    exception: String
    testcase: Testcase!
  }

  enum STATUS {
    PASS
    FAIL
    SKIP
    UNKNOWN
    FATAL
  }

  type Query {
    allExecutions: [Execution!]!
    allSuites: [Suite!]!
  }

  type Mutation {
    createExecution(execution: ExecutionInput!): Execution
    createSuite(suite: SuiteInput!): Suite
  }

  input ExecutionInput {
    name: String!
    description: String
    status: STATUS!
    createdAt: DateTime!
    updatedAt: DateTime!
    type: String!
    testApi: String
    exception: String
    configuration: Json
  }

  input SuiteInput {
    name: String!
    description: String
    status: STATUS!
    createdAt: DateTime!
    updatedAt: DateTime!
    exception: String
    execution: Execution!
    requirementId: String
    testcases: [Testcase!]
    configuration: Json
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers: resolver });
