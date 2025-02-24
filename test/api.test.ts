/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as chai from 'chai';
import chaiAsPromised from  'chai-as-promised';
import { Query } from "../src/graphql/query.ts";
import { PrismaClient } from "@prisma/client";
import sinon from "sinon";
import { createServer } from 'node:http';
import request from 'supertest';

const yoga = createServer();
chai.use(chaiAsPromised);
const expect = chai.expect;

const prisma = new PrismaClient();
const stubTodo = sinon.stub(prisma.todo, "findMany");
const mockTodos = [
  {
    id: "1",
    title: "First Todo",
    completed: false,
    createdAt: new Date("2023-10-01T12:00:00.000Z"),
    updatedAt: new Date("2023-10-01T12:00:00.000Z"),
  },
  {
    id: "2",
    title: "Second Todo",
    completed: true,
    createdAt: new Date("2023-10-02T12:00:00.000Z"),
    updatedAt: new Date("2023-10-02T12:00:00.000Z"),
  },
];
describe("test", () => {

  

  it("whatever", () => {
    expect(1).to.equal(1);
  });
});
describe("test2",  () =>{
  it("test hello world", async() =>{

    const response = await request(yoga).post('/graphql').send({
      query: '{hello}'
    })
    expect(response.body.hello).to.deep.equal('world');
  });
});
// describe("Query Resolvers", () => {


//   before(() => {
//     stubTodo.resolves(mockTodos);
//   });

//   afterEach(() => {
//     stubTodo.restore();
//   });

  
//     it("should return all todos", async () => {

//       // @ts-expect-error the query resolver can be call but ts is being a dick about it
//       const result = await Query.getAllTodos({}, {}, { prisma }); 

//       expect(result).to.deep.equal([
//         {
//           id: "1",
//           title: "First Todo",
//           completed: false,
//           createdAt: "2023-10-01T12:00:00.000Z",
//           updatedAt: "2023-10-01T12:00:00.000Z",
//         },
//         {
//           id: "2",
//           title: "Second Todo",
//           completed: true,
//           createdAt: "2023-10-02T12:00:00.000Z",
//           updatedAt: "2023-10-02T12:00:00.000Z",
//         },
//       ]);
//     });
// });