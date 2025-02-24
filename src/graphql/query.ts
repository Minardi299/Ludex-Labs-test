import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

const prisma = new PrismaClient();

export const Query: IQuery<Context> = {
  hello: () => "world",
  getAllTodos: async () => {
    return await prisma.todo.findMany();
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
    return todo;
  },
  getIncompleteTodos: async () => {
    const incompletes = await prisma.todo.findMany({
      where: { completed: false },
    });
    return incompletes;
  },
  getCompletedTodos: async () => {
    const completes = await prisma.todo.findMany({
      where: { completed: true },
    });
    return completes;
  },
};
