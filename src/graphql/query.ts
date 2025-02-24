import { type QueryResolvers as IQuery } from "./generated/graphql.ts";
import { Context } from "./context.js";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

const prisma = new PrismaClient();

export const Query: IQuery<Context> = {
  hello: () => "world",
  getAllTodos: async () => {
    const todos = await prisma.todo.findMany();
    return todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(), 
      updatedAt: todo.updatedAt.toISOString(),
    }));
  },
  getTodoById: async (_, { id }: {id: string}, { prisma }) => {
    if (!id || id.trim() === "") {
      throw new GraphQLError("ID is required", {
        extensions: {
          code: "MISSING_ID",
          http: { status: 400 },
        },
      });
    }
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new GraphQLError("Todo not found", {
        extensions: {
          code: "NOT_FOUND",
          http: { status: 404 },
        },
      });
    }
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    };;
  },
  getIncompleteTodos: async () => {
    const incompletes = await prisma.todo.findMany({
      where: { completed: false },
    });
    return incompletes.map(incompletes => ({
      id: incompletes.id,
      title: incompletes.title,
      completed: incompletes.completed,
      createdAt: incompletes.createdAt.toISOString(), 
      updatedAt: incompletes.updatedAt.toISOString(),
    }));
  },
  getCompletedTodos: async () => {
    const completes = await prisma.todo.findMany({
      where: { completed: true },
    });
    return completes.map(completes => ({
      id: completes.id,
      title: completes.title,
      completed: completes.completed,
      createdAt: completes.createdAt.toISOString(), 
      updatedAt: completes.updatedAt.toISOString(),
    }));
  },
};
