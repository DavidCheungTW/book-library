const { Author } = require("../models");
const {
  createItem,
  readItem,
  searchItem,
  getItemById,
  patchItem,
  deleteItem,
} = require("../controllers/helper");

exports.createAuthor = (req, res) => {
  createItem(Author, req, res);
};

exports.readAuthor = (req, res) => {
  readItem(Author, req, res);
};

exports.searchAuthor = (req, res) => {
  searchItem(Author, req, res);
};

exports.readSingleAuthor = (req, res) => {
  getItemById(Author, req, res);
};

exports.patchAuthor = (req, res) => {
  patchItem(Author, req, res);
};

exports.deleteAuthor = (req, res) => {
  deleteItem(Author, req, res);
};
