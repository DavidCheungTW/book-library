const { Book } = require("../models");
const {
  createItem,
  readItem,
  searchItem,
  getItemById,
  patchItem,
  deleteItem,
} = require("../controllers/helper");

exports.createBook = (req, res) => {
  createItem(Book, req, res);
};

exports.readBook = (req, res) => {
  readItem(Book, req, res);
};

exports.searchBook = (req, res) => {
  searchItem(Book, req, res);
};

exports.readSingleBook = (req, res) => {
  getItemById(Book, req, res);
};

exports.patchBook = (req, res) => {
  patchItem(Book, req, res);
};

exports.deleteBook = (req, res) => {
  deleteItem(Book, req, res);
};
