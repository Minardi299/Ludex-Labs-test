import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";
import { PrismaClient } from "@prisma/client";

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
  
};
