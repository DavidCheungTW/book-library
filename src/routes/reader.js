const express = require("express");
const router = express.Router();
const {
  createReader,
  readReader,
  readSingleReader,
  patchReader,
  deleteReader,
} = require("../controllers/reader");

/**
 * @swagger
 * /readers:
 *  post:
 *      tags:
 *          - readers
 *      description: Create new reader
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: reader
 *          description: The reader to create
 *          schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          201:
 *              description: Reader created
 *  get:
 *      tags:
 *          - readers
 *      description: Get all readers
 *      responses:
 *          200:
 *              description: All readers were retrieved
 */

router.route("/readers").post(createReader).get(readReader);

/**
 * @swagger
 * /readers/{readerId}:
 *  get:
 *      tags:
 *          - readers
 *      description: Get reader with id
 *      parameters:
 *        - in: path
 *          name: readerId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of reader to retrieve
 *      responses:
 *          200:
 *              description: Reader that was retrieved
 *          404:
 *              description: Reader is not found
 *  patch:
 *      tags:
 *          - readers
 *      description: Update any attributes of reader
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: readerId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of reader to patch
 *        - in: body
 *          name: reader
 *          description: The reader to patch
 *          schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          200:
 *              description: Reader patched
 *          404:
 *              description: Reader is not found
 *  delete:
 *      tags:
 *          - readers
 *      description: Delete reader
 *      parameters:
 *        - in: path
 *          name: readerId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of reader to delete
 *      responses:
 *          204:
 *              description: Reader that was deleted
 *          404:
 *              description: Reader is not found
 */

router
  .route("/readers/:id")
  .get(readSingleReader)
  .patch(patchReader)
  .delete(deleteReader);

module.exports = router;
