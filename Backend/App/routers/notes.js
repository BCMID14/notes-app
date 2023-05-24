const express = require('express');
const controllerHandler = require('../controllers/helpers/controllerHandler');
const NotesController = require('../controllers/notes/NotesController');

const router = express.Router();

/**
 * a note type
 * @typedef {object} Note.
 * @property {integer} id - post id.
 * @property {string} title - post title.
 * @property {string} subtitle - post subtitle.
 * @property {string} body - post body.
 * @property {string} created_at - date of creation.
 * @property {string} updated_at - date of last update.
 */

/**
 * GET /notes
 * @summary get all posts.
 * @tags the notes - The notes's
 * @return {array<notes>} 200 - success response.
 * @return {object} 500 - internal server error.
 */
router.get('/', controllerHandler(NotesController.getAll.bind(NotesController)));

/**
 * POST /new_note.
 * @summary create a new note.
 * @tags Post Create a note.
 * @param ({sting: title, string: subtitle, string: body}) request.body - nots
 * @return {results} 200 - success response.
 * @return {object} 500 - internal server error.
 */
router.post('/new_note', controllerHandler(NotesController.create.bind(NotesController)));

/**
 * GET /note/{id}.
 * @summary get a post.
 * @tags Get one note.
 * @param {integer} id.path - note id.
 * @return {note}  200 - success response.
 * @return {object} 500 - internal server error.
 */
router.get('/note/:id([0-9]+)', controllerHandler(NotesController.getOne.bind(NotesController)));

/**
 * PATCH /modify/{id}
 * @summary modify a note.
 * @tags Modify note.
 * @description Modify the note by id.
 * @operationid modify.
 * @param {integer} id.path - note id.
 * @return {results} - 200 - success response - application/json
 * @return {object} 500 - internal server error.
 */
router.patch('/modify/:id([0-9]+)', controllerHandler(NotesController.modify.bind(NotesController)));

/**
 * DELETE /delete/{id}
 * @summary delete a note.
 * @tags Delete a note.
 * @param {integer} id.path - note id.
 * @return {object} 204 - success response.
 * @return {object} 500 - internal server error.
 */
router.delete('/delete/:id([0-9]+)', controllerHandler(NotesController.delete.bind(NotesController)));


module.exports = router;