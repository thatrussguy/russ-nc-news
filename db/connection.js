const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");

const dbConfig =
  ENV === "production"
    ? {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
          directory: "./migrations"
        },
        seeds: {
          directory: "./seeds"
        }
      }
    : require("../knexfile");

module.exports = knex(dbConfig);
