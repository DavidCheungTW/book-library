const express = require("express");
const router = express.Router();
const controllers = require("../controllers/book");

router.route("/books").post(controllers.createBook).get(controllers.readBook);

router.route("/books/search").post(controllers.searchBook);

router
  .route("/books/:id")
  .get(controllers.readSingleBook)
  .patch(controllers.patchBook)
  .delete(controllers.deleteBook);

module.exports = router;
