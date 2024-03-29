const express = require("express");
const router = express.Router();
const {
  createBook,
  readBook,
  searchBook,
  readSingleBook,
  patchBook,
  deleteBook,
} = require("../controllers/book");

/**
 * @swagger
 * /books:
 *  post:
 *      tags:
 *          - books
 *      description: Create new book
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: book
 *          description: The book to create
 *          schema:
 *              type: object
 *              required:
 *                - title
 *              properties:
 *                  title:
 *                      type: string
 *                  ISBN:
 *                      type: string
 *                  authorId:
 *                      type: number
 *                  genreId:
 *                      type: number
 *      responses:
 *          201:
 *              description: Book created
 *  get:
 *      tags:
 *          - books
 *      description: Get all books
 *      responses:
 *          200:
 *              description: All books were retrieved
 */

router.route("/books").post(createBook).get(readBook);

router.route("/books/search").post(searchBook);

/**
 * @swagger
 * /books/{bookId}:
 *  get:
 *      tags:
 *          - books
 *      description: Get book with id
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of book to retrieve
 *      responses:
 *          200:
 *              description: Book that was retrieved
 *          404:
 *              description: Book is not found
 *  patch:
 *      tags:
 *          - books
 *      description: Update any attributes of book
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of book to patch
 *        - in: body
 *          name: book
 *          description: The book to patch
 *          schema:
 *              type: object
 *              required:
 *                - title
 *              properties:
 *                  title:
 *                      type: string
 *                  ISBN:
 *                      type: string
 *                  authorId:
 *                      type: number
 *                  genreId:
 *                      type: number
 *      responses:
 *          200:
 *              description: Book patched
 *          404:
 *              description: Book is not found
 *  delete:
 *      tags:
 *          - books
 *      description: Delete book
 *      parameters:
 *        - in: path
 *          name: bookId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of book to delete
 *      responses:
 *          204:
 *              description: Book that was deleted
 *          404:
 *              description: Book is not found
 */

router
  .route("/books/:id")
  .get(readSingleBook)
  .patch(patchBook)
  .delete(deleteBook);

module.exports = router;
