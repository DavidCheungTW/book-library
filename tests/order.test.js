const { expect } = require("chai");
const request = require("supertest");
const { Order, Book, Author, Genre, Reader } = require("../src/models");
const app = require("../src/app");

describe("/orders", () => {
  let author;
  let genre;
  let book;
  let reader;
  const testStartDate = "2023-03-15";
  const testEndDate = "2023-04-15";

  before(async () => {
    await Order.sequelize.sync({ force: true });
    author = await request(app).post("/authors").send({ author: "author001" });
    genre = await request(app).post("/genres").send({ genre: "genre001" });
    book = await request(app).post("/books").send({
      title: "title001",
      ISBN: "isbn001",
      authorId: author.body.id,
      genreId: genre.body.id,
    });
    reader = await request(app).post("/readers").send({
      name: "Elizabeth Bennet",
      email: "future_ms_darcy@gmail.com",
      password: "12345678",
    });
  });

  beforeEach(async () => {
    await Order.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /orders", () => {
      it("creates a new order in the database", async () => {
        const response = await request(app).post("/orders").send({
          startDate: testStartDate,
          endDate: testEndDate,
          orderCount: 0,
          bookId: book.body.id,
          readerId: reader.body.id,
        });
        expect(response.status).to.equal(201);

        const newOrderRecord = await Order.findByPk(response.body.id, {
          raw: true,
        });
        expect(newOrderRecord.startDate).to.equal(testStartDate);
        expect(newOrderRecord.endDate).to.equal(testEndDate);
        expect(newOrderRecord.orderCount).to.equal(0);
      });

      it("Start Date must be exist", async () => {
        const response = await request(app).post("/orders").send({
          endDate: testEndDate,
          orderCount: 0,
          bookId: book.body.id,
          readerId: reader.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal("SequelizeValidationError");
      });

      it("Start Date must not be empty", async () => {
        const response = await request(app).post("/orders").send({
          startDate: "",
          endDate: testEndDate,
          orderCount: 0,
          bookId: book.body.id,
          readerId: reader.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal("SequelizeValidationError");
      });

      it("End Date must be exist", async () => {
        const response = await request(app).post("/orders").send({
          startDate: testStartDate,
          orderCount: 0,
          bookId: book.body.id,
          readerId: reader.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal("SequelizeValidationError");
      });

      it("End Date must not be empty", async () => {
        const response = await request(app).post("/orders").send({
          startDate: testStartDate,
          endDate: "",
          orderCount: 0,
          bookId: book.body.id,
          readerId: reader.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal("SequelizeValidationError");
      });

      it("End Date must be exist", async () => {
        const response = await request(app).post("/orders").send({
          startDate: testStartDate,
          endDate: testEndDate,
          bookId: book.body.id,
          readerId: reader.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal("SequelizeValidationError");
      });

      it("End Date must not be empty", async () => {
        const response = await request(app).post("/orders").send({
          startDate: testStartDate,
          endDate: testEndDate,
          orderCount: "",
          bookId: book.body.id,
          readerId: reader.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal("SequelizeValidationError");
      });

      it("bookId must be exist", async () => {
        const response = await request(app).post("/orders").send({
          startDate: testStartDate,
          endDate: testEndDate,
          orderCount: 0,
          bookId: 999,
          readerId: reader.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          "SequelizeForeignKeyConstraintError"
        );
      });

      it("reader must be exist", async () => {
        const response = await request(app).post("/orders").send({
          startDate: testStartDate,
          endDate: testEndDate,
          orderCount: 0,
          bookId: book.body.id,
          readerId: 999,
        });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          "SequelizeForeignKeyConstraintError"
        );
      });
    });
  });

  describe("with records in the database", () => {
    let orders;
    beforeEach(async () => {
      orders = await Promise.all([
        Order.create({
          startDate: testStartDate,
          endDate: testEndDate,
          orderCount: 0,
          bookId: book.body.id,
          readerId: reader.body.id,
        }),
        Order.create({
          startDate: testStartDate,
          endDate: testEndDate,
          orderCount: 0,
          bookId: book.body.id,
          readerId: reader.body.id,
        }),
        Order.create({
          startDate: testStartDate,
          endDate: testEndDate,
          orderCount: 0,
          bookId: book.body.id,
          readerId: reader.body.id,
        }),
      ]);
    });

    describe("GET /orders", () => {
      it("gets all orders records", async () => {
        const response = await request(app).get("/orders");
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        let bookRow;
        let readerRow;

        // Do not use forEach with async-await
        // response.body.forEach((order) => {
        for (const order of response.body) {
          const expected = orders.find((a) => a.id === order.id);

          expect(order.startDate).to.equal(expected.startDate);
          expect(order.endDate).to.equal(expected.endDate);
          expect(order.orderCount).to.equal(expected.orderCount);

          // use .findByPk to get and compare
          bookRow = await Book.findByPk(expected.bookId, {
            raw: true,
          });
          readerRow = await Reader.findByPk(expected.readerId, {
            raw: true,
          });
          expect(order.book.title).to.equal(bookRow.title);
          expect(order.reader.name).to.equal(readerRow.name);
        }
      });
    });

    describe("POST /orders/search", () => {
      it("gets all orders records with selection", async () => {
        const response = await request(app)
          .post("/orders/search")
          .send({ startDate: "2023-03-15" });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);
      });
    });

    describe("GET /orders/:id", () => {
      it("gets orders record by id", async () => {
        const order = orders[0];

        const response = await request(app).get(`/orders/${order.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.startDate).to.equal(order.startDate);
        expect(response.body.endDate).to.equal(order.endDate);
        expect(response.body.orderCount).to.equal(order.orderCount);

        // use .findByPk to get and compare
        const bookRow = await Book.findByPk(response.body.bookId, {
          raw: true,
        });
        const readerRow = await Reader.findByPk(response.body.readerId, {
          raw: true,
        });
        expect(response.body.book.title).to.equal(bookRow.title);
        expect(response.body.reader.name).to.equal(readerRow.name);
      });

      it("returns a 404 if the order does not exist", async () => {
        const response = await request(app).get("/orders/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The order could not be found.");
      });
    });

    describe("PATCH /orders/:id", () => {
      it("updates orders genre by id", async () => {
        const order = orders[0];
        const response = await request(app)
          .patch(`/orders/${order.id}`)
          .send({ endDate: "2023-05-15", orderCount: 1 });

        const updatedOrderRecord = await Order.findByPk(order.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedOrderRecord.endDate).to.equal("2023-05-15");
        expect(updatedOrderRecord.orderCount).to.equal(1);
      });

      it("returns a 404 if the order does not exist", async () => {
        const response = await request(app)
          .patch("/orders/12345")
          .send({ endDate: "2023-05-15", orderCount: 1 });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The order could not be found.");
      });

      it("endDate must not be empty", async () => {
        const order = orders[0];
        const response = await request(app)
          .patch(`/orders/${order.id}`)
          .send({ endDate: "" });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal("SequelizeValidationError");
      });

      it("orderCount must be max 3", async () => {
        const order = orders[0];
        const response = await request(app)
          .patch(`/orders/${order.id}`)
          .send({ orderCount: 4 });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal("SequelizeValidationError");
      });

      it("bookId must be existed in Authors table", async () => {
        const order = orders[0];
        const response = await request(app)
          .patch(`/orders/${order.id}`)
          .send({ bookId: 999 });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          "SequelizeForeignKeyConstraintError"
        );
        // expect(response.body).to.equal(
        //   'Key (authorId)=(999) is not present in table "Authors".'
        // );
      });

      it("readerId must be existed in Authors table", async () => {
        const order = orders[0];
        const response = await request(app)
          .patch(`/orders/${order.id}`)
          .send({ readerId: 999 });
        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          "SequelizeForeignKeyConstraintError"
        );
      });
    });

    describe("DELETE /orders/:id", () => {
      it("deletes order record by id", async () => {
        const order = orders[0];
        const response = await request(app).delete(`/orders/${order.id}`);
        const deletedOrder = await Order.findByPk(order.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedOrder).to.equal(null);
      });

      it("returns a 404 if the order does not exist", async () => {
        const response = await request(app).delete("/orders/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The order could not be found.");
      });
    });
  });
});
