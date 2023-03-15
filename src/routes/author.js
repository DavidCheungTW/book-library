const express = require("express");
const router = express.Router();
const {
  createAuthor,
  readAuthor,
  searchAuthor,
  readSingleAuthor,
  patchAuthor,
  deleteAuthor,
} = require("../controllers/author");

/**
 * @swagger
 * /authors:
 *  post:
 *      tags:
 *          - authors
 *      description: Create new author
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: author
 *          description: The author to create
 *          schema:
 *              type: object
 *              required:
 *                - author
 *              properties:
 *                  author:
 *                      type: string
 *      responses:
 *          201:
 *              description: Author created
 *  get:
 *      tags:
 *          - authors
 *      description: Get all authors
 *      responses:
 *          200:
 *              description: All authors were retrieved
 */

router.route("/authors").post(createAuthor).get(readAuthor);

router.route("/authors/search").post(searchAuthor);

/**
 * @swagger
 * /authors/{authorId}:
 *  get:
 *      tags:
 *          - authors
 *      description: Get author with id
 *      parameters:
 *        - in: path
 *          name: authorId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of author to retrieve
 *      responses:
 *          200:
 *              description: Author that was retrieved
 *          404:
 *              description: Author is not found
 *  patch:
 *      tags:
 *          - authors
 *      description: Update any attributes of author
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: authorId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of author to patch
 *        - in: body
 *          name: author
 *          description: The author to patch
 *          schema:
 *              type: object
 *              required:
 *                - author
 *              properties:
 *                  author:
 *                      type: string
 *      responses:
 *          200:
 *              description: Author patched
 *          404:
 *              description: Author is not found
 *  delete:
 *      tags:
 *          - authors
 *      description: Delete author
 *      parameters:
 *        - in: path
 *          name: authorId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of author to delete
 *      responses:
 *          200:
 *              description: Author that was deleted
 *          404:
 *              description: Author is not found
 */

router
  .route("/authors/:id")
  .get(readSingleAuthor)
  .patch(patchAuthor)
  .delete(deleteAuthor);

module.exports = router;
