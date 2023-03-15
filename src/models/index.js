const Sequelize = require("sequelize");
const ReaderModel = require("./reader");
const BookModel = require("./book");
const AuthorModel = require("./author");
const GenreModel = require("./genre");
const OrderModel = require("./order");

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    port: PGPORT,
    dialect: "postgres",
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Author = AuthorModel(connection, Sequelize);
  const Genre = GenreModel(connection, Sequelize);
  const Order = OrderModel(connection, Sequelize);

  Book.belongsTo(Author, {
    as: "author",
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: "This Book must have an author" },
        notEmpty: { msg: "This Book must have an author" },
      },
    },
  });

  Book.belongsTo(Genre, {
    as: "genre",
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: "This Book must have an genre" },
        notEmpty: { msg: "This Book must have an genre" },
      },
    },
  });

  Order.belongsTo(Book, {
    as: "book",
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: "Order must have a book" },
        notEmpty: { msg: "Order must have a book" },
      },
    },
  });

  Order.belongsTo(Reader, {
    as: "reader",
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: "Order must have a reader" },
        notEmpty: { msg: "Order must have a reader" },
      },
    },
  });

  connection.sync({ alter: true });

  return {
    Reader,
    Book,
    Author,
    Genre,
    Order,
  };
};

module.exports = setupDatabase();
