const dbConfig = {
  client: "pg",
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
  }
};

const knex = require("knex")(dbConfig);

module.exports.getUserById = async id => {
  try {
    const res = await knex("users")
      .where({ id: id })
      .then(res => res[0]);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserByEmail = async email => {
  try {
    const res = await knex("users")
      .where({ email: email })
      .then(res => res[0]);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports.addUser = async data => {
  try {
    const res = await knex("users")
      .insert(data)
      .returning("*")
      .then(res => res);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports.updateUser = async (id, data) => {
  try {
    const res = await knex("users")
      .where({ id: id })
      .update(data)
      .then(res => res[0]);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports.addList = async data => {
  try {
    const res = await knex("lists")
      .insert(data)
      .returning("*")
      .then(res => res[0]);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports.getListById = async id => {
  try {
    const res = await knex("lists")
      .where({ id: id })
      .then(res => res[0]);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports.updateList = async (id, data) => {
  try {
    const res = await knex("lists")
      .where({ id: id })
      .update(data)
      .then(res => res[0]);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteList = async id => {
  try {
    const res = await knex("lists")
      .where({ id: id })
      .del()
      .then(res => res);
    return res;
  } catch (err) {
    throw err;
  }
};
