const debug = require('debug')('notes:controllers');
const CoreController = require('../CoreController');
const NotesDataMapper = require('../../models/database/NotesDataMapper');

/** Class representing a notes controller. */
class NotesController extends CoreController {
  static dataMapper = NotesDataMapper;

  /**
   * create a note controller
  *
  * @augments CoreController
  */
  constructor() {
    super();
    debug('NotesController created');
  }
}

module.exports = new NotesController();