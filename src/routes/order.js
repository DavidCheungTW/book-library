const express = require("express");
const router = express.Router();
const controllers = require("../controllers/order");

router
  .route("/orders")
  .post(controllers.createOrder)
  .get(controllers.readOrder);

router.route("/orders/search").post(controllers.searchOrder);

router
  .route("/orders/:id")
  .get(controllers.readSingleOrder)
  .patch(controllers.patchOrder)
  .delete(controllers.deleteOrder);

module.exports = router;
