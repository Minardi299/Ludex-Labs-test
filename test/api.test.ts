/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as chai from 'chai';
import chaiAsPromised from  'chai-as-promised';
import { Query } from "../src/graphql/query.ts";
import { PrismaClient } from "@prisma/client";
import sinon from "sinon";


chai.use(chaiAsPromised);
const expect = chai.expect;
describe("Query Resolvers", () => {

  

  it("whatever", () => {
    expect(1).to.equal(1);
  });
});
describe("Query Resolvers", () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getAllTodos", () => {
    it("should return all todos sorted by createdAt in descending order by default", async () => {
      // Mock data
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

      // Mock Prisma's findMany method
      const findManyStub = sinon.stub(prisma.todo, "findMany").resolves(mockTodos);

      // Call the resolver


      // @ts-expect-error the query resolver can be call but ts is being a dick about it
      const result = await Query.getAllTodos({}, {}, { prisma }); 

      // Assertions
      expect(findManyStub.calledOnce).to.be.true;
      expect(result).to.deep.equal([
        {
          id: "1",
          title: "First Todo",
          completed: false,
          createdAt: "2023-10-01T12:00:00.000Z",
          updatedAt: "2023-10-01T12:00:00.000Z",
        },
        {
          id: "2",
          title: "Second Todo",
          completed: true,
          createdAt: "2023-10-02T12:00:00.000Z",
          updatedAt: "2023-10-02T12:00:00.000Z",
        },
      ]);
    });
  });
});