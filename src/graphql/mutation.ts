import { type MutationResolvers as IMutation, type UpdateTodoInput as TodoInput } from "./generated/graphql.ts";
import { Context } from "./context.js";
import {  Prisma } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

// const prisma = new PrismaClient();

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

  createTodo: async (_, { title }: {title: string}, { prisma }) => {
    if (!title || title.trim() === "") {
      throw new GraphQLError("ID is required", {
        extensions: {
          code: "MISSING_TITLE",
          http: { status: 400 },
        },
      });
    }
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
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    };
  },
  toggleTodo: async (_, { id }: {id: string}, { prisma }) => {
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
      createdAt: updatedTodo.createdAt.toISOString(),
      updatedAt: updatedTodo.updatedAt.toISOString(),
    };
  },
  
  deleteTodo: async (_, { id }: { id: string }, { prisma }) =>{
    if (!id || id.trim() === "") {
      throw new GraphQLError("ID is required", {
        extensions: {
          code: "MISSING_ID",
          http: { status: 400 },
        },
      });
    }
    try {
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
      await prisma.todo.delete({
        where: { id },
      });
  
      return "successful"; 
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma error deleting todo:", error);
        throw new GraphQLError("Database error", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
      console.error("Error deleting todo:", error);
      throw error;
    }
  },

  updateTodo: async (_, {input}: {input: TodoInput}, { prisma } ) =>{
    const { id, title, completed } = input;
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
    const updateData: {
      title?: { set: string }; 
      completed?: boolean; 
    } = {};
    //if the title is not undefined and not null, then set it, otherwise use the current  one
    if (title !== undefined && title !== null) {
      updateData.title = { set: title }; 
    }

    if (completed !== undefined  && completed !== null) {
      updateData.completed = completed; 
    }
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateData,
    });
    return {
      id: updatedTodo.id,
      title: updatedTodo.title,
      completed: updatedTodo.completed,
      createdAt: updatedTodo.createdAt.toISOString(),
      updatedAt: updatedTodo.updatedAt.toISOString(),
    };
  },
};
