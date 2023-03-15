const express = require("express");
const router = express.Router();
const controllers = require("../controllers/author");

router
  .route("/authors")
  .post(controllers.createAuthor)
  .get(controllers.readAuthor);

router.route("/authors/search").post(controllers.searchAuthor);

router
  .route("/authors/:id")
  .get(controllers.readSingleAuthor)
  .patch(controllers.patchAuthor)
  .delete(controllers.deleteAuthor);

module.exports = router;
