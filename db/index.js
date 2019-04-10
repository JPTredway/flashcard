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

const getUserById = async id => {
  try {
    const res = await knex
      .select("*")
      .from("users")
      .where({ id: id })
      .then(res => res);
    return res;
  } catch (err) {
    throw err;
  }
};

const addUser = async ({ id, email, password }) => {
  try {
    const res = await knex("users")
      .insert({ id, email, password })
      .returning("*")
      .then(res => res);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUserById,
  addUser
};
