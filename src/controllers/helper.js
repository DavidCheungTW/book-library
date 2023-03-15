const { Book } = require("../models");

exports.createItem = async (model, req, res) => {
  let row;
  try {
    row = await model.create(req.body);
    const { id } = row.toJSON();
    if (model.name === "Book") {
      row = await model.findByPk(id, {
        include: ["author", "genre"],
      });
    } else {
      row = await model.findByPk(id, {
        modelName: "Reader",
        attributes: { exclude: "password" },
      });
    }
    return res.status(201).json(row);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.readItem = async (model, _, res) => {
  let rows;
  try {
    if (model.name === "Book") {
      rows = await model.findAll({ include: ["author", "genre"] });
    } else if (model.name === "Order") {
      rows = await model.findAll({ include: ["book", "reader"] });
    } else {
      rows = await model.findAll({
        modelName: "Reader",
        attributes: { exclude: "password" },
      });
    }
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.searchItem = async (model, req, res) => {
  try {
    const rows = await model.findAll({ where: req.body });
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getItemById = async (model, req, res) => {
  let row;
  const tableName = model.name.toLowerCase();
  try {
    if (model.name === "Book") {
      row = await model.findByPk(req.params.id, {
        include: ["author", "genre"],
      });
    } else if (model.name === "Order") {
      row = await model.findByPk(req.params.id, {
        include: ["book", "reader"],
      });
    } else {
      row = await model.findByPk(req.params.id, {
        modelName: "Reader",
        attributes: { exclude: "password" },
      });
    }
    if (row == null) {
      return res
        .status(404)
        .json({ error: `The ${tableName} could not be found.` });
    }
    if (model.name === "Author") {
      const rows = await Book.findAll({ where: { authorId: row.id } });
      const books = rows.map((item) => {
        return item.toJSON();
      });

      // combine json and return
      const result = { ...row.toJSON(), books };
      return res.status(200).json(result);
    } else {
      return res.status(200).json(row);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.patchItem = async (model, req, res) => {
  const tableName = model.name.toLowerCase();
  let row;
  try {
    row = await model.findByPk(req.params.id);
    if (row == null) {
      return res
        .status(404)
        .json({ error: `The ${tableName} could not be found.` });
    }

    const rows = await model.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (model.name === "Book") {
      row = await model.findByPk(req.params.id, {
        include: ["author", "genre"],
      });
    } else if (model.name === "Order") {
      row = await model.findByPk(req.params.id, {
        include: ["book", "reader"],
      });
    } else {
      row = await model.findByPk(req.params.id, {
        modelName: "Reader",
        attributes: { exclude: "password" },
      });
    }
    res.status(200).json(row);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteItem = async (model, req, res) => {
  const tableName = model.name.toLowerCase();

  try {
    const row = await model.findByPk(req.params.id);
    if (row == null) {
      return res
        .status(404)
        .json({ error: `The ${tableName} could not be found.` });
    }

    const rows = await model.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json(err);
  }
};
