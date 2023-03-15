const { Order } = require("../models");
const {
  createItem,
  readItem,
  searchItem,
  getItemById,
  patchItem,
  deleteItem,
} = require("../controllers/helper");

exports.createOrder = (req, res) => {
  createItem(Order, req, res);
};

exports.readOrder = (req, res) => {
  readItem(Order, req, res);
};

exports.searchOrder = (req, res) => {
  searchItem(Order, req, res);
};

exports.readSingleOrder = (req, res) => {
  getItemById(Order, req, res);
};

exports.patchOrder = (req, res) => {
  patchItem(Order, req, res);
};

exports.deleteOrder = (req, res) => {
  deleteItem(Order, req, res);
};
