const { gql } = require("apollo-server");

const typeDefs = gql`
  type Email {
    id: Int!
    address: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    oneEmail(id: Int!): Email!
    allEmails: [Email!]!
  }

  type Mutation {
    createEmail(address: String!): Email!
    deleteEmail(address: String!): Email!
  }

  scalar Date

  type MyType {
    createdAt: Date!
    updatedAt: Date!
  }
`;

module.exports = typeDefs;
