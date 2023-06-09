const debug = require('debug')('notes:controllers');
const sanitizeHtml = require('sanitize-html');
const { noteValidate } = require('../validation/data.schema');

/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;

  /**
   * responds with all entries from a table
   * @param {Object} _
   * @param {Object} response
   */
  async getAll(_, response) {
    debug(`${this.constructor.name} getAll`);
    const results = await this.constructor.dataMapper.findAll();
    response.status(200).json(results);
  }

  /**
   * responds with one entry from a table
   * @param {Object} request
   * @param {Object} response
   */
  async getOne(request, response) {
    debug(`${this.constructor.name} getOne`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findByPk(id);
    if (results) {
      return response.json(results);
    }
    return response.status(204).send();
  }

  /**
   * create one entry in a table
   * @param {Object} request
   * @param {Object} response
   */
  async create(request, response) {
    debug(`${this.constructor.name} create`);

    noteValidate.validateAsync(request.body);

    const {title, subtitle, body} = request.body;

    const cleanTitle = sanitizeHtml(title);
    const cleanSubtitle = sanitizeHtml(subtitle);
    const cleanBody = sanitizeHtml(body);

    const results = await this.constructor.dataMapper.create(title, subtitle, body);
     response.json(results);
  }

  /**
   * modify one entry in a table
   * @param {Object} request
   * @param {Object} response
   * @return {results} - the post modify.
   */
  async modify(request, response) {
    debug(`${this.constructor.name} modify`);
    const { id } = request.params;

    noteValidate.validateAsync(request.body);

    const {title, subtitle, body} = request.body;

    const cleanTitle = sanitizeHtml(title);
    const cleanSubtitle = sanitizeHtml(subtitle);
    const cleanBody = sanitizeHtml(body);
    
    const results = await this.constructor.dataMapper.modify(title, subtitle, body, id);
    response.status(200).json(results);
  }

  /**
   * remove one entry in a table
   * @param {Object} request
   * @param {Object} response
   */
  async delete(request, response) {
    debug(`${this.constructor.name} delete`);
    const { id } = request.params;
    await this.constructor.dataMapper.delete(id);
    return response.status(204).send();
  }
}

module.exports = CoreController;  