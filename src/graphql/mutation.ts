import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

const prisma = new PrismaClient();

export const Mutation: IMutation<Context> = {
  createSomething: async (_, { input }, { prisma }) => {
    const something = await prisma.something.create({
      data: {
        name: input.name,
      },
    });

    return {
      id: something.id,
      name: something.name,
    };
  },

  createTodo: async (_: any, { title }: {title: string}, { prisma }) => {
    const todo = await prisma.todo.create({
      data: { 
        title: title,
        completed: false 
      },
    });

    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    };
  },
  toggleTodo: async (_: any, { id }: {id: string}, { prisma }) => {
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

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        completed: !todo.completed,
      },
    });

    return {
      id: updatedTodo.id,
      title: updatedTodo.title,
      completed: updatedTodo.completed,
    };
  },
};
