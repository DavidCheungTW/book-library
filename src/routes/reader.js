const express = require("express");
const router = express.Router();
const controllers = require("../controllers/reader");

router
  .route("/readers")
  .post(controllers.createReader)
  .get(controllers.readReader);

router
  .route("/readers/:id")
  .get(controllers.readSingleReader)
  .patch(controllers.patchReader)
  .delete(controllers.deleteReader);

module.exports = router;
