const debug = require('debug')('notes:dataMapper');
const client = require('./helpers/database');

/** Class representing an abstract data mapper. */
class CoreDataMapper {
  static tableName;
  static viewName; // if viewName is defined, it will be used for find methods

  /**
   * fetch all entries
   * @returns {array} array of entries
   */
  async findAll() {
    debug(`${this.constructor.name} findAll`);
    const tableName = this.constructor.viewName || this.constructor.tableName;

    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" ORDER BY "id"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  /**
   * fetch an entry according to its id
   * @param {number} id - id of the entry
   * @returns an entry
   */
  async findByPk(id) {
    debug(`${this.constructor.name} findByPk(${id})`);
    const tableName = this.constructor.viewName || this.constructor.tableName;

    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" WHERE id=$1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }
  
 /**
  * Create the notes.
  * @param {string} title - the note title.
  * @param {string} subtitle - the note subtitle.
  * @param {string} body - the note body.
  * @returns {Object} the created entry
  */
  async create(title, subtitle, body) {
    debug(`${this.constructor.name} create`);
    const tableName = this.constructor.viewName || this.constructor.tableName;

    const preparedQuery = {
      text: `INSERT INTO ${tableName} (title, subtitle, body) VALUES ($1, $2, $3)`,
      values: [title, subtitle, body]
  };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

 /**
  * Upddate de the note
  * @param {string} title - the note title.
  * @param {string} subtitle - the note subtitle.
  * @param {string} body - the note body.
  * @param {integer} id - the note id.
  * @returns the modified entry.
  */
  async modify(title, subtitle, body, id) {
    debug(`${this.constructor.name} modify(${title}, ${subtitle} ,${body},${id})`);
    const tableName = this.constructor.viewName || this.constructor.tableName;

    const preparedQuery = {
      text: `UPDATE ${tableName} SET title = $1, subtitle = $2, body = $3 WHERE id = $4`,
      values: [title, subtitle, body, id]
  };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * remove an entry
   * @param {integer} id - the entry id.
   */
  async delete(id) {
    debug(`${this.constructor.name} delete(${id})`);

    const preparedQuery = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id=$1`,
      values: [id],
    };
    await client.query(preparedQuery);
  }
}

module.exports = CoreDataMapper;