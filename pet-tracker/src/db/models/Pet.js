const knex = require('./knex');

class Pet {

  static async create({ name, picture, species, friendly }) {
    try {
      const query = `INSERT INTO pets (name, picture, species, friendly) values (?, ?, ?, ?) returning *`;
      const { rows: [newPet] } = await knex.raw(query, [name, picture, species, friendly]);
      return newPet;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async getPets() {
    try {
      const query = `SELECT * FROM pets`;
      const { rows } = await knex.raw(query);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deletePet(id) {
    try {
      const query = `DELETE FROM pets WHERE id = ?`;
      const { rows: [newToDo] } = await knex.raw(query, [id]);
      return newToDo;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Pet;