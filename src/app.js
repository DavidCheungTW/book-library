const express = require("express");

const app = express();

var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
const path = require("path");

app.use(express.json());

// ------ Configure swagger docs ------
var options = {
  swaggerDefinition: {
    info: {
      title: "My Book Library",
      version: "1.0.0",
      description: "Book Library by David Cheung",
    },
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};
var swaggerSpecs = swaggerJsdoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (req, res) => {
  res.status(200).json({ result: "Welcome to Book library!" });
});

const readerRouter = require("../src/routes/reader");
const bookRouter = require("../src/routes/book");
const authorRouter = require("../src/routes/author");
const genreRouter = require("../src/routes/genre");
const orderRouter = require("../src/routes/order");

app.use(readerRouter);
app.use(bookRouter);
app.use(authorRouter);
app.use(genreRouter);
app.use(orderRouter);

module.exports = app;
