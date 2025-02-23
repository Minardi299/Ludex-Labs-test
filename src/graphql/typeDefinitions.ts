export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }

  type Something {
    id: ID!
    name: String!
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(title: String!): Todo!
    toggleTodo(id: String!): Todo!
  }

  type Query {
    hello: String
    getAllTodos: [Todo]
  }
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }
`;
