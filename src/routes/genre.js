const express = require("express");
const router = express.Router();
const {
  createGenre,
  readGenre,
  searchGenre,
  readSingleGenre,
  patchGenre,
  deleteGenre,
} = require("../controllers/genre");

/**
 * @swagger
 * /genres:
 *  post:
 *      tags:
 *          - genres
 *      description: Create new genre
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: genre
 *          description: The genre to create
 *          schema:
 *              type: object
 *              required:
 *                - genre
 *              properties:
 *                  genre:
 *                      type: string
 *      responses:
 *          201:
 *              description: Genre created
 *  get:
 *      tags:
 *          - genres
 *      description: Get all genres
 *      responses:
 *          200:
 *              description: All genres were retrieved
 */

router.route("/genres").post(createGenre).get(readGenre);

router.route("/genres/search").post(searchGenre);

/**
 * @swagger
 * /genres/{genreId}:
 *  get:
 *      tags:
 *          - genres
 *      description: Get genre with id
 *      parameters:
 *        - in: path
 *          name: genreId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of genre to retrieve
 *      responses:
 *          200:
 *              description: Genre that was retrieved
 *          404:
 *              description: Genre is not found
 *  patch:
 *      tags:
 *          - genres
 *      description: Update any attributes of genre
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: genreId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of genre to patch
 *        - in: body
 *          name: genre
 *          description: The genre to patch
 *          schema:
 *              type: object
 *              required:
 *                - genre
 *              properties:
 *                  genre:
 *                      type: string
 *      responses:
 *          200:
 *              description: Genre patched
 *          404:
 *              description: Genre is not found
 *  delete:
 *      tags:
 *          - genres
 *      description: Delete genre
 *      parameters:
 *        - in: path
 *          name: genreId
 *          schema:
 *              type: number
 *          required: true
 *          description: number id of genre to delete
 *      responses:
 *          204:
 *              description: Genre that was deleted
 *          404:
 *              description: Genre is not found
 */

router
  .route("/genres/:id")
  .get(readSingleGenre)
  .patch(patchGenre)
  .delete(deleteGenre);

module.exports = router;
