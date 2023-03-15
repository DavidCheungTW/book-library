const express = require("express");
const router = express.Router();
const controllers = require("../controllers/genre");

router
  .route("/genres")
  .post(controllers.createGenre)
  .get(controllers.readGenre);

router.route("/genres/search").post(controllers.searchGenre);

router
  .route("/genres/:id")
  .get(controllers.readSingleGenre)
  .patch(controllers.patchGenre)
  .delete(controllers.deleteGenre);

module.exports = router;
