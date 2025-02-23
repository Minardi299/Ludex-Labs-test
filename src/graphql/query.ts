import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Query: IQuery<Context> = {
  hello: () => "world",
  getAllTodos: async () => {
    return await prisma.todo.findMany();
  },
};
