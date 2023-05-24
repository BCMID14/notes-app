const debug = require('debug')('notes:dataMapper');
const CoreDataMapper = require('../CoreDataMapper');

/** Class representing a notes data mapper. */
class NotesDataMapper extends CoreDataMapper {
  static tableName = 'my_notes';

  /**
   * create a notes data mapper
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('notes data mapper created');
  }
}

module.exports = new NotesDataMapper();