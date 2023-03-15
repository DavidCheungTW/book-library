const { Genre } = require("../models");
const {
  createItem,
  readItem,
  searchItem,
  getItemById,
  patchItem,
  deleteItem,
} = require("../controllers/helper");

exports.createGenre = (req, res) => {
  createItem(Genre, req, res);
};

exports.readGenre = (req, res) => {
  readItem(Genre, req, res);
};

exports.searchGenre = (req, res) => {
  searchItem(Genre, req, res);
};

exports.readSingleGenre = (req, res) => {
  getItemById(Genre, req, res);
};

exports.patchGenre = (req, res) => {
  patchItem(Genre, req, res);
};

exports.deleteGenre = (req, res) => {
  deleteItem(Genre, req, res);
};
