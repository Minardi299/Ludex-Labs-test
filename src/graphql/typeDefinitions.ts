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
    toggleTodo(id: ID!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    toggleTodo(id: ID!): Todo!
    deleteTodo(id: ID!): Boolean!
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
  }
`;
