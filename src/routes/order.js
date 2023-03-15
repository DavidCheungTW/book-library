const express = require("express");
const router = express.Router();
const {
  createOrder,
  readOrder,
  searchOrder,
  readSingleOrder,
  patchOrder,
  deleteOrder,
} = require("../controllers/order");

/**
 * @swagger
 * /orders:
 *  post:
 *      tags:
 *          - orders
 *      description: Create new order
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: order
 *          description: The order to create
 *          schema:
 *              type: object
 *              required:
 *                - startDate
 *              properties:
 *                  startDate:
 *                      type: string
 *                  endDate:
 *                      type: string
 *                  orderCount:
 *                      type: number
 *                  bookId:
 *                      type: number
 *                  readerId:
 *                      type: number
 *      responses:
 *          201:
 *              description: Order created
 *  get:
 *      tags:
 *          - orders
 *      description: Get all orders
 *      responses:
 *          200:
 *              description: All orders were retrieved
 */

router.route("/orders").post(createOrder).get(readOrder);

router.route("/orders/search").post(searchOrder);

/**
 * @swagger
 * /orders/{orderId}:
 *  get:
 *      tags:
 *          - orders
 *      description: Get order with id
 *      parameters:
 *        - in: path
 *          name: orderId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of order to retrieve
 *      responses:
 *          200:
 *              description: Order that was retrieved
 *          404:
 *              description: Order is not found
 *  patch:
 *      tags:
 *          - orders
 *      description: Update any attributes of order
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: orderId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of order to patch
 *        - in: body
 *          name: order
 *          description: The order to patch
 *          schema:
 *              type: object
 *              required:
 *                - startDate
 *              properties:
 *                  startDate:
 *                      type: string
 *                  endDate:
 *                      type: string
 *                  orderCount:
 *                      type: number
 *                  bookId:
 *                      type: number
 *                  readerId:
 *                      type: number
 *      responses:
 *          200:
 *              description: Order patched
 *          404:
 *              description: Order is not found
 *  delete:
 *      tags:
 *          - orders
 *      description: Delete order
 *      parameters:
 *        - in: path
 *          name: orderId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of order to delete
 *      responses:
 *          204:
 *              description: Order that was deleted
 *          404:
 *              description: Order is not found
 */

router
  .route("/orders/:id")
  .get(readSingleOrder)
  .patch(patchOrder)
  .delete(deleteOrder);

module.exports = router;
