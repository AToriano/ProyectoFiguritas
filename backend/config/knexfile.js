const knex = require("knex")({
  client: "pg",
  connection: {
    host: "silly.db.elephantsql.com",
    port: 5432,
    user: "jnmvvkmb",
    password: process.env.DB_PASSWORD,
    database: "jnmvvkmb",
  },
});

module.exports = knex;
