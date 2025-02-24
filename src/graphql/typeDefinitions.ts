export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }

  type Something {
    id: ID!
    name: String!
  }
  input UpdateTodoInput {
    id: ID!
    title: String
    completed: Boolean
  }
  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(title: String!): Todo!
    toggleTodo(id: ID!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): String!
  }

  type Query {
    hello: String
    getAllTodos: [Todo]
    getTodoById(id: ID!): Todo
    getIncompleteTodos: [Todo!]!
    getCompletedTodos: [Todo!]!
  }
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
